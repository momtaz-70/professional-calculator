# استفاده از nginx به عنوان base image
FROM nginx:alpine

# کپی کردن تنظیمات nginx سفارشی
COPY nginx.conf /etc/nginx/conf.d/default.conf

# کپی کردن فایل‌های پروژه به مسیر nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# کپی کردن فایل‌های اضافی
COPY README.md /usr/share/nginx/html/

# تنظیم مجوزها
RUN chmod -R 755 /usr/share/nginx/html

# اضافه کردن label ها برای metadata
LABEL maintainer="Kiro AI"
LABEL description="ماشین حساب حرفه‌ای با قابلیت‌های علمی"
LABEL version="1.0.0"

# expose کردن پورت 80
EXPOSE 80

# nginx در foreground اجرا می‌شود
CMD ["nginx", "-g", "daemon off;"]