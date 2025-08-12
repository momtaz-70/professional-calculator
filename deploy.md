# راهنمای Deploy در GitHub 🚀

## مرحله 1: ایجاد Repository در GitHub

1. به GitHub.com برو
2. روی "New repository" کلیک کن
3. نام repository: `professional-calculator`
4. توضیح: `ماشین حساب حرفه‌ای با قابلیت‌های علمی`
5. Public انتخاب کن
6. "Create repository" کلیک کن

## مرحله 2: آپلود فایل‌ها

### روش اول: از طریق Command Line

```bash
# مقداردهی اولیه Git
git init

# اضافه کردن فایل‌ها
git add .

# اولین commit
git commit -m "🎉 اضافه کردن ماشین حساب حرفه‌ای"

# اضافه کردن remote origin
git remote add origin https://github.com/USERNAME/professional-calculator.git

# push کردن به GitHub
git push -u origin main
```

### روش دوم: از طریق GitHub Desktop

1. GitHub Desktop را باز کن
2. "Add an Existing Repository" کلیک کن
3. پوشه پروژه را انتخاب کن
4. "Publish repository" کلیک کن

### روش سوم: از طریق وب GitHub

1. در repository جدید، "uploading an existing file" کلیک کن
2. تمام فایل‌ها را drag & drop کن
3. "Commit changes" کلیک کن

## مرحله 3: فعال کردن GitHub Pages

1. در repository، به تب "Settings" برو
2. در منوی چپ، "Pages" کلیک کن
3. در قسمت "Source"، "Deploy from a branch" انتخاب کن
4. Branch را "main" انتخاب کن
5. "Save" کلیک کن

## مرحله 4: دسترسی به سایت

بعد از چند دقیقه، سایت در آدرس زیر در دسترس خواهد بود:
```
https://USERNAME.github.io/professional-calculator/
```

## نکات مهم:

- `USERNAME` را با نام کاربری GitHub خودت جایگزین کن
- ممکن است تا 10 دقیقه طول بکشه تا سایت فعال بشه
- هر بار که تغییری در کد بدی، سایت خودکار آپدیت می‌شه

## مثال کامل دستورات:

```bash
# جایگزین کن با نام کاربری خودت
USERNAME="yourusername"

git init
git add .
git commit -m "🎉 اضافه کردن ماشین حساب حرفه‌ای"
git branch -M main
git remote add origin https://github.com/$USERNAME/professional-calculator.git
git push -u origin main
```

موفق باشی! 🎉