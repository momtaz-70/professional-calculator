class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.memory = 0;
        this.isScientificMode = false;
        this.angleMode = 'deg'; // deg or rad
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        
        this.addAnimation();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = this.parseValue(this.previousOperand);
        const current = this.parseValue(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('نمی‌توان بر صفر تقسیم کرد!');
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        // محدود کردن اعشار به 10 رقم
        if (computation.toString().includes('.')) {
            computation = parseFloat(computation.toFixed(10));
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.addAnimation();
        this.updateDisplay();
    }

    parseValue(value) {
        const str = value.toString();
        if (str === 'π') return Math.PI;
        if (str === 'e') return Math.E;
        return parseFloat(str);
    }

    scientificOperation(operation) {
        const current = this.parseValue(this.currentOperand || '0');
        let result;

        switch (operation) {
            case 'sin':
                result = Math.sin(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                break;
            case 'cos':
                result = Math.cos(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                break;
            case 'tan':
                result = Math.tan(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                break;
            case 'log':
                if (current <= 0) {
                    alert('لگاریتم اعداد منفی یا صفر تعریف نشده است!');
                    return;
                }
                result = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    alert('لگاریتم طبیعی اعداد منفی یا صفر تعریف نشده است!');
                    return;
                }
                result = Math.log(current);
                break;
            case 'sqrt':
                if (current < 0) {
                    alert('ریشه اعداد منفی در اعداد حقیقی تعریف نشده است!');
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'factorial':
                if (current < 0 || !Number.isInteger(current)) {
                    alert('فاکتوریل فقط برای اعداد صحیح غیرمنفی تعریف شده است!');
                    return;
                }
                result = this.factorial(current);
                break;
            case '1/x':
                if (current === 0) {
                    alert('نمی‌توان بر صفر تقسیم کرد!');
                    return;
                }
                result = 1 / current;
                break;
            default:
                return;
        }

        // محدود کردن اعشار
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(10));
        }

        this.currentOperand = result;
        this.addAnimation();
        this.updateDisplay();
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        if (n > 170) {
            alert('عدد خیلی بزرگ است!');
            return Infinity;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    toggleMode() {
        this.isScientificMode = !this.isScientificMode;
        const panel = document.getElementById('scientificPanel');
        const toggle = document.getElementById('modeToggle');
        
        if (this.isScientificMode) {
            panel.classList.add('active');
            toggle.textContent = 'ساده';
        } else {
            panel.classList.remove('active');
            toggle.textContent = 'علمی';
        }
    }

    toggleSign() {
        if (this.currentOperand === '' || this.currentOperand === '0') return;
        
        if (this.currentOperand.toString().charAt(0) === '-') {
            this.currentOperand = this.currentOperand.toString().substring(1);
        } else {
            this.currentOperand = '-' + this.currentOperand.toString();
        }
        
        this.updateDisplay();
    }

    memoryStore() {
        this.memory = this.parseValue(this.currentOperand || '0');
        const indicator = document.getElementById('memoryIndicator');
        indicator.classList.add('active');
        this.showMessage('ذخیره شد در حافظه');
    }

    memoryRecall() {
        if (this.memory !== 0) {
            this.currentOperand = this.memory;
            this.updateDisplay();
            this.showMessage('بازیابی از حافظه');
        }
    }

    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease;
        `;
        
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 2000);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand === '') {
            this.currentOperandElement.innerText = '0';
        } else {
            this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        }
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    addAnimation() {
        const display = document.querySelector('.display');
        display.classList.add('animate');
        setTimeout(() => {
            display.classList.remove('animate');
        }, 300);
    }
}

// ایجاد نمونه از ماشین حساب
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

// پشتیبانی از کیبورد
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // اعداد
    if (key >= '0' && key <= '9') {
        calculator.appendNumber(key);
    }
    
    // نقطه اعشار
    if (key === '.') {
        calculator.appendNumber('.');
    }
    
    // پرانتزها
    if (key === '(') {
        calculator.appendNumber('(');
    }
    if (key === ')') {
        calculator.appendNumber(')');
    }
    
    // عملگرها
    if (key === '+') {
        calculator.chooseOperation('+');
    }
    if (key === '-') {
        calculator.chooseOperation('-');
    }
    if (key === '*') {
        calculator.chooseOperation('×');
    }
    if (key === '/') {
        event.preventDefault();
        calculator.chooseOperation('÷');
    }
    if (key === '^') {
        calculator.chooseOperation('^');
    }
    if (key === '%') {
        calculator.chooseOperation('%');
    }
    
    // محاسبه
    if (key === 'Enter' || key === '=') {
        calculator.compute();
    }
    
    // پاک کردن
    if (key === 'Escape') {
        calculator.clear();
    }
    
    // حذف
    if (key === 'Backspace') {
        calculator.delete();
    }
    
    // تغییر علامت
    if (key === 'F9') {
        calculator.toggleSign();
    }
    
    // حافظه
    if (event.ctrlKey && key === 'm') {
        event.preventDefault();
        calculator.memoryStore();
    }
    if (event.ctrlKey && key === 'r') {
        event.preventDefault();
        calculator.memoryRecall();
    }
    
    // حالت علمی
    if (key === 'F2') {
        calculator.toggleMode();
    }
});

// اضافه کردن افکت صوتی (اختیاری)
function playClickSound() {
    // می‌توانید صدای کلیک اضافه کنید
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
}

console.log('ماشین حساب حرفه‌ای آماده است! 🧮');