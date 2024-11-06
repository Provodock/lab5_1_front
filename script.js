document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const formResult = document.getElementById('formResult');

    // Регулярні вирази для валідації
    const validationRules = {
        pib: {
            pattern: /^[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ]\. [А-ЯІЇЄ]\.$/,
            message: 'ПІБ має бути у форматі "Прізвище І. Б."'
        },
        birthday: {
            pattern: /^\d{2}-\d{2}-\d{4}$/,
            message: 'Дата має бути у форматі "01-01-2000"'
        },
        faculty: {
            pattern: /^[А-ЯІЇЄ][А-ЯІЇЄа-яіїє\s]{2,}$/,
            message: 'Назва факультету має починатися з великої літери'
        },
        address: {
            pattern: /^м\.\s[А-ЯІЇЄ][а-яіїє]+$/,
            message: 'Адреса має бути у форматі "м. Місто"'
        },
        email: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Введіть коректну email адресу'
        }
    };

    // Функція валідації поля
    function validateField(input) {
        const field = input.name;
        const value = input.value;
        const rule = validationRules[field];

        const errorElement = input.nextElementSibling;

        if (!rule.pattern.test(value)) {
            input.classList.add('error');
            errorElement.textContent = rule.message;
            return false;
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }

    // Додаємо обробники подій для валідації при введенні
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Обробник подання форми
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        // Перевіряємо всі поля і збираємо дані
        form.querySelectorAll('input').forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
            formData[input.name] = input.value;
        });

        // Якщо всі поля валідні, відображаємо результат
        if (isValid) {
            displayResult(formData);
        }
    });

    // Функція відображення результату
    function displayResult(data) {
        const labels = {
            pib: 'ПІБ',
            birthday: 'Дата народження',
            faculty: 'Факультет',
            address: 'Адреса',
            email: 'E-mail'
        };

        formResult.innerHTML = Object.entries(data)
            .map(([key, value]) => `
                <div class="result-item">
                    <span class="result-label">${labels[key]}:</span>
                    <span class="result-value">${value}</span>
                </div>
            `)
            .join('');
    }
});