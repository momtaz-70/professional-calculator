# راهنمای نصب و راه‌اندازی Docker 🐳

## نصب Docker

### Windows
1. **Docker Desktop** را از [docker.com](https://www.docker.com/products/docker-desktop/) دانلود کنید
2. فایل نصب را اجرا کنید
3. بعد از نصب، Docker Desktop را باز کنید
4. در تنظیمات، **WSL 2 integration** را فعال کنید

### Linux (Ubuntu/Debian)
```bash
# آپدیت پکیج‌ها
sudo apt update

# نصب Docker
sudo apt install docker.io docker-compose

# اضافه کردن کاربر به گروه docker
sudo usermod -aG docker $USER

# ری‌استارت سیستم یا logout/login
```

### macOS
1. **Docker Desktop** را از [docker.com](https://www.docker.com/products/docker-desktop/) دانلود کنید
2. فایل .dmg را باز کرده و Docker را به Applications منتقل کنید
3. Docker Desktop را اجرا کنید

## بررسی نصب

```bash
# بررسی نسخه Docker
docker --version

# بررسی نسخه Docker Compose
docker-compose --version

# تست اجرا
docker run hello-world
```

## اجرای ماشین حساب

### روش 1: Docker Compose (ساده‌ترین)
```bash
# ساخت و اجرا
docker-compose up -d

# مشاهده وضعیت
docker-compose ps

# مشاهده لاگ‌ها
docker-compose logs -f

# توقف
docker-compose down
```

### روش 2: اسکریپت‌های آماده
```bash
# ساخت image
./build.sh

# اجرای container
./run.sh
```

### روش 3: دستورات دستی
```bash
# ساخت image
docker build -t professional-calculator:latest .

# اجرای container
docker run -d --name calculator -p 8080:80 professional-calculator:latest
```

## دسترسی به ماشین حساب

بعد از اجرا موفق، ماشین حساب در آدرس زیر در دسترس است:
**http://localhost:8080**

## مزایای استفاده از Docker

✅ **قابلیت حمل**: روی هر سیستمی اجرا می‌شود  
✅ **ایزوله**: تداخلی با سیستم اصلی ندارد  
✅ **سریع**: راه‌اندازی در چند ثانیه  
✅ **قابل اعتماد**: همیشه یکسان کار می‌کند  
✅ **مقیاس‌پذیر**: می‌توان چندین نمونه اجرا کرد  

## عیب‌یابی

### مشکل WSL 2
اگر در Windows از WSL استفاده می‌کنید:
1. Docker Desktop را باز کنید
2. Settings → Resources → WSL Integration
3. Ubuntu یا distro خود را فعال کنید

### مشکل دسترسی
```bash
# اضافه کردن کاربر به گروه docker
sudo usermod -aG docker $USER

# logout و login مجدد
```

### مشکل پورت
```bash
# استفاده از پورت دیگر
docker run -d --name calculator -p 9090:80 professional-calculator:latest
```

## فایل‌های ایجاد شده

📁 **Dockerfile** - تعریف image  
📁 **docker-compose.yml** - تنظیمات compose  
📁 **nginx.conf** - پیکربندی nginx  
📁 **.dockerignore** - فایل‌های نادیده گرفته شده  
📁 **build.sh** - اسکریپت ساخت  
📁 **run.sh** - اسکریپت اجرا  

همه چیز آماده است! فقط Docker را نصب کنید و از ماشین حساب لذت ببرید! 🎉