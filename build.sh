#!/bin/bash

# رنگ‌ها برای output زیبا
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 شروع ساخت Docker Image برای ماشین حساب حرفه‌ای${NC}"

# نام image و tag
IMAGE_NAME="professional-calculator"
TAG="latest"
FULL_NAME="$IMAGE_NAME:$TAG"

echo -e "${YELLOW}📦 در حال ساخت image: $FULL_NAME${NC}"

# ساخت Docker image
if docker build -t $FULL_NAME .; then
    echo -e "${GREEN}✅ Image با موفقیت ساخته شد!${NC}"
    
    # نمایش اطلاعات image
    echo -e "${BLUE}📊 اطلاعات Image:${NC}"
    docker images $IMAGE_NAME
    
    echo -e "${YELLOW}🚀 برای اجرا از دستور زیر استفاده کنید:${NC}"
    echo -e "${GREEN}docker run -d -p 8080:80 --name calculator $FULL_NAME${NC}"
    echo -e "${YELLOW}یا از docker-compose استفاده کنید:${NC}"
    echo -e "${GREEN}docker-compose up -d${NC}"
    
    echo -e "${BLUE}🌐 بعد از اجرا، ماشین حساب در آدرس زیر در دسترس خواهد بود:${NC}"
    echo -e "${GREEN}http://localhost:8080${NC}"
    
else
    echo -e "${RED}❌ خطا در ساخت image!${NC}"
    exit 1
fi