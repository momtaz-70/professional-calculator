#!/bin/bash

# رنگ‌ها برای output زیبا
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

IMAGE_NAME="professional-calculator:latest"
CONTAINER_NAME="calculator"
PORT="8080"

echo -e "${BLUE}🚀 اجرای ماشین حساب حرفه‌ای در Docker${NC}"

# بررسی وجود container قبلی
if docker ps -a --format 'table {{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo -e "${YELLOW}⚠️  Container قبلی پیدا شد. در حال حذف...${NC}"
    docker stop $CONTAINER_NAME 2>/dev/null
    docker rm $CONTAINER_NAME 2>/dev/null
fi

# اجرای container جدید
echo -e "${YELLOW}🐳 در حال اجرای container جدید...${NC}"

if docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $IMAGE_NAME; then
    
    echo -e "${GREEN}✅ Container با موفقیت اجرا شد!${NC}"
    
    # انتظار برای آماده شدن سرویس
    echo -e "${YELLOW}⏳ انتظار برای آماده شدن سرویس...${NC}"
    sleep 3
    
    # بررسی وضعیت container
    if docker ps --format 'table {{.Names}}\t{{.Status}}' | grep -q "$CONTAINER_NAME"; then
        echo -e "${GREEN}🎉 ماشین حساب آماده است!${NC}"
        echo -e "${BLUE}🌐 آدرس دسترسی: ${GREEN}http://localhost:$PORT${NC}"
        echo -e "${BLUE}📊 وضعیت Container:${NC}"
        docker ps --filter "name=$CONTAINER_NAME" --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
        
        echo -e "${YELLOW}💡 دستورات مفید:${NC}"
        echo -e "${GREEN}  - مشاهده لاگ‌ها: docker logs $CONTAINER_NAME${NC}"
        echo -e "${GREEN}  - توقف: docker stop $CONTAINER_NAME${NC}"
        echo -e "${GREEN}  - شروع مجدد: docker start $CONTAINER_NAME${NC}"
        echo -e "${GREEN}  - حذف: docker rm -f $CONTAINER_NAME${NC}"
    else
        echo -e "${RED}❌ خطا در اجرای container!${NC}"
        docker logs $CONTAINER_NAME
        exit 1
    fi
else
    echo -e "${RED}❌ خطا در اجرای container!${NC}"
    exit 1
fi