$(document).ready(function () {

    // Переопределяем стандартные скорости
    $.fx.speeds.fast = 150;   // теперь 'fast' = 150 миллисекунд
    $.fx.speeds.slow = 800;   // 'slow' = 800 миллисекунд
    
    // Добавляем новую скорость для особо медленных анимаций
    // Теперь можно писать: .fadeIn("turtle") - будет длиться 2 секунды
    $.fx.speeds.turtle = 2000; // 'turtle' = 2000 миллисекунд (2 секунды)

    function setCookie(name, value, days = 7) {
        try {
            // Кодируем имя и значение для безопасного хранения
            // Без этого символы ; , = и пробелы могут нарушить структуру cookie
            const encodedName = encodeURIComponent(name);
            const encodedValue = encodeURIComponent(value);

            // Формируем срок истечения cookie
            let expires = "";
            if (days) {
                const date = new Date();
                // Вычисляем дату: текущее время + (дни * 24ч * 60мин * 60сек * 1000мс)
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }

            // Устанавливаем cookie с path=/ (доступна на всем сайте)
            // Формат: имя=значение; expires=дата; path=путь
            document.cookie = `${encodedName}=${encodedValue}${expires}; path=/`;
        } catch (e) {
            // Обрабатываем возможные ошибки (например, если cookies отключены в браузере)
            console.error("Ошибка setCookie:", e);
        }
    }

    function getCookie(name) {
        try {
            // Добавляем "=", чтобы искать именно имя, а не часть другого имени
            const encodedName = encodeURIComponent(name) + "=";
            
            // document.cookie возвращает строку вида: "key1=val1; key2=val2; key3=val3"
            const cookies = document.cookie.split(";");

            // Перебираем все cookie
            for (let c of cookies) {
                // Удаляем пробелы в начале (важно, т.к. после split могут остаться пробелы)
                c = c.trim();
                
                // Проверяем, начинается ли текущая cookie с искомого имени
                if (c.indexOf(encodedName) === 0) {
                    // Извлекаем значение (все, что после знака =)
                    const value = c.substring(encodedName.length);
                    // Декодируем и возвращаем
                    return decodeURIComponent(value);
                }
            }
            return null; // Cookie не найдена
        } catch (e) {
            console.error("Ошибка getCookie:", e);
            return null;
        }
    }

    function delCookie(name) {
        // Передаем days = -1, что устанавливает дату истечения в прошлом
        // Браузер автоматически удаляет такие cookies
        setCookie(name, "", -1);
    }

    const $form = $("#feedbackForm");
    const $name = $("#name");
    const $email = $("#email");
    const $phone = $("#phone");
    const $message = $("#message");
    const $checkbox = $("#agree");
    const $submitBtn = $("#submitBtn");

    // Элементы для отображения ошибок валидации
    const $nameError = $("#nameError");
    const $emailError = $("#emailError");
    const $messageError = $("#messageError");

    function loadFromCookies() {
        // Получаем значения из cookies
        const name = getCookie("name");
        const email = getCookie("email");
        const phone = getCookie("phone");
        const message = getCookie("message");
        const agreed = getCookie("agreed");

        // Заполняем поля формы, если значения существуют
        if (name) $name.val(name);
        if (email) $email.val(email);
        if (phone) $phone.val(phone);
        if (message) $message.val(message);
        
        // Для чекбокса проверяем именно "true" (строка), т.к. getCookie возвращает строку
        // Если использовать if(agreed), то любое непустое значение сделает чекбокс отмеченным
        if (agreed === "true") $checkbox.prop("checked", true);
    }

    // Вызываем загрузку данных при старте
    loadFromCookies();

    function saveToCookies() {
        setCookie("name", $name.val());
        setCookie("email", $email.val());
        setCookie("phone", $phone.val());
        setCookie("message", $message.val());
        setCookie("agreed", $checkbox.prop("checked"));
    }

    $form.hide().fadeIn("slow");

    // Изначально поле телефона заблокировано
    $phone.prop("disabled", true);
    
    // При вводе текста в поле имени проверяем, не пустое ли оно
    $name.on("input", function () {
        // Если имя не пустое (после удаления пробелов), разблокируем поле телефона
        $phone.prop("disabled", $name.val().trim() === "");
    });

    function showError($el, $errorEl, text) {
        // Добавляем класс для стилизации (красная рамка)
        $el.addClass("input-error");

        // Показываем сообщение об ошибке с анимацией
        $errorEl
            .stop(true, true)   // Останавливаем все текущие анимации на этом элементе
            .hide()             // Скрываем (чтобы анимация началась с нуля)
            .text(text)         // Устанавливаем текст ошибки
            .slideDown("fast"); // Плавно показываем со скоростью 'fast' (150 мс)
    }

    function hideError($el, $errorEl) {
        // Удаляем класс ошибки (убираем красную рамку)
        $el.removeClass("input-error");

        // Плавно скрываем сообщение
        $errorEl
            .stop(true, true)
            .slideUp("fast");
    }

    function validateForm() {
        let isValid = true; // Предполагаем, что форма валидна

        // ----- Валидация имени -----
        if ($name.val().trim() === "") {
            showError($name, $nameError, "Введите имя");
            isValid = false;
        } else {
            hideError($name, $nameError);
        }

        // ----- Валидация email -----
        if ($email.val().trim() === "") {
            showError($email, $emailError, "Введите email");
            isValid = false;
        } else if (!$email.val().includes("@")) {
            // Примечание: в production стоит использовать регулярное выражение
            // /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)
            showError($email, $emailError, "Некорректный email");
            isValid = false;
        } else {
            hideError($email, $emailError);
        }

        // ----- Валидация сообщения -----
        if ($message.val().trim() === "") {
            showError($message, $messageError, "Введите сообщение");
            isValid = false;
        } else {
            hideError($message, $messageError);
        }

        // ----- Валидация чекбокса -----
        if (!$checkbox.prop("checked")) {
            isValid = false; // Ошибку не показываем, просто блокируем отправку
        }

        return isValid;
    }

    function updateButton() {
        if (validateForm()) {
            // Форма валидна: делаем кнопку активной и меняем класс на зеленый
            $submitBtn
                .removeClass("btn-default")
                .addClass("btn-success")
                .prop("disabled", false);
        } else {
            // Форма невалидна: блокируем кнопку и делаем серой
            $submitBtn
                .removeClass("btn-success")
                .addClass("btn-default")
                .prop("disabled", true);
        }
    }

    $form.on("input change", function () {
        updateButton();   // Проверяем валидность и обновляем кнопку
        saveToCookies();  // Сохраняем текущие значения в cookies
    });

    // Инициализируем кнопку при загрузке страницы
    updateButton();

    $form.on("submit", function (event) {
        // Отменяем стандартное поведение формы (перезагрузку страницы)
        event.preventDefault();

        // Проверяем валидность перед отправкой
        if (!validateForm()) {
            // Анимация "тряски" - визуальный сигнал об ошибке
            // Форма смещается влево-вправо, привлекая внимание пользователя
            $form
                .stop(true, true)                      // Останавливаем текущие анимации
                .animate({ marginLeft: "-8px" }, 60)   // Сдвиг влево
                .animate({ marginLeft: "8px" }, 60)    // Сдвиг вправо
                .animate({ marginLeft: "-8px" }, 60)   // Снова влево
                .animate({ marginLeft: "0px" }, 60);   // Возврат в исходное положение
            return; // Прерываем отправку
        }

        // ----- Сбор данных формы -----
        const data = {
            name: $name.val(),
            email: $email.val(),
            phone: $phone.val(),
            message: $message.val(),
            agreed: $checkbox.prop("checked")
        };

        // Выводим данные в консоль (в реальном проекте здесь был бы AJAX-запрос)
        console.log("Данные формы:", data);

        // ----- Анимация подтверждения отправки -----
        // Создаем эффект "пульсации" - форма становится полупрозрачной и возвращается
        $form
            .animate({ opacity: 0.5 }, 200)  // Уменьшаем прозрачность
            .delay(100)                      // Ждем 100 мс
            .animate({ opacity: 1 }, 200, function () {
                // Колбэк после завершения анимации
                alert("Форма отправлена!");  // Уведомляем пользователя
            });

        // ----- Очистка формы -----
        // ВАЖНО: Код очистки cookies закомментирован для демонстрации
        // В реальном проекте можно раскомментировать, чтобы удалить черновик после отправки
        // delCookie("name");
        // delCookie("email");
        // delCookie("phone");
        // delCookie("message");
        // delCookie("agreed");

        // Сбрасываем значения всех полей формы
        $form[0].reset();
        
        // Обновляем состояние кнопки (после сброса форма станет невалидной)
        updateButton();
    });

});