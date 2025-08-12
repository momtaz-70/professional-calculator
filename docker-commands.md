# راهنمای Docker Commands 🐳

## ساخت و اجرای سریع

### روش 1: استفاده از اسکریپت‌های آماده
```bash
# ساخت image
chmod +x build.sh
./build.sh

# اجرای container
chmod +x run.sh
./run.sh
```

### روش 2: استفاده از Docker Compose (پیشنهادی)
```bash
# ساخت و اجرا در یک مرحله
docker-compose up -d

# مشاهده لاگ‌ها
docker-compose logs -f

# توقف
docker-compose down
```

### روش 3: دستورات دستی Docker

#### ساخت Image
```bash
docker build -t professional-calculator:latest .
```

#### اجرای Container
```bash
docker run -d \
  --name calculator \
  -p 8080:80 \
  --restart unless-stopped \
  professional-calculator:latest
```

## دستورات مدیریتی

### مشاهده وضعیت
```bash
# لیست container های در حال اجرا
docker ps

# مشاهده لاگ‌ها
docker logs calculator

# مشاهده لاگ‌ها به صورت زنده
docker logs -f calculator
```

### مدیریت Container
```bash
# توقف
docker stop calculator

# شروع مجدد
docker start calculator

# ری‌استارت
docker restart calculator

# حذف (ابتدا باید متوقف شود)
docker rm -f calculator
```

### مدیریت Image
```bash
# لیست image ها
docker images

# حذف image
docker rmi professional-calculator:latest

# پاک کردن image های استفاده نشده
docker image prune
```

## تنظیمات پیشرفته

### اجرا با Volume برای Development
```bash
docker run -d \
  --name calculator-dev \
  -p 8080:80 \
  -v $(pwd):/usr/share/nginx/html \
  nginx:alpine
```

### اجرا با متغیرهای محیطی
```bash
docker run -d \
  --name calculator \
  -p 8080:80 \
  -e NGINX_HOST=calculator.local \
  -e NGINX_PORT=80 \
  professional-calculator:latest
```

### اجرا با Memory و CPU محدود
```bash
docker run -d \
  --name calculator \
  -p 8080:80 \
  --memory="128m" \
  --cpus="0.5" \
  professional-calculator:latest
```

## Docker Hub

### آپلود به Docker Hub
```bash
# تگ کردن برای Docker Hub
docker tag professional-calculator:latest username/professional-calculator:latest

# آپلود
docker push username/professional-calculator:latest
```

### دانلود از Docker Hub
```bash
docker pull username/professional-calculator:latest
```

## Troubleshooting

### مشکلات رایج

#### پورت در حال استفاده
```bash
# پیدا کردن process استفاده کننده از پورت
lsof -i :8080

# یا استفاده از پورت دیگر
docker run -d -p 9090:80 --name calculator professional-calculator:latest
```

#### مشکل دسترسی
```bash
# بررسی وضعیت container
docker inspect calculator

# ورود به container برای debug
docker exec -it calculator sh
```

#### پاک کردن کامل
```bash
# حذف تمام container ها و image های مربوطه
docker-compose down --rmi all --volumes --remove-orphans

# یا به صورت دستی
docker rm -f calculator
docker rmi professional-calculator:latest
```

## آدرس‌های دسترسی

بعد از اجرا، ماشین حساب در آدرس‌های زیر در دسترس است:

- **Local**: http://localhost:8080
- **Network**: http://YOUR_IP:8080
- **Docker Compose**: http://calculator.localhost (با تنظیم hosts)

## نکات امنیتی

- Container به صورت non-root اجرا می‌شود
- فقط پورت 80 expose شده
- فایل‌های غیرضروری در .dockerignore قرار دارند
- nginx با تنظیمات امنیتی پیکربندی شده

موفق باشید! 🎉