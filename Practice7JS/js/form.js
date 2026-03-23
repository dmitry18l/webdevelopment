$(document).ready(function () {
    // ==== ПОДГОТОВКА ЭЛЕМЕНТОВ ====
    // Сохраняем ссылки на элементы формы в переменные jQuery
    // $ перед названием переменной — общепринятое обозначение для jQuery-объектов
    const $form = $("#feedbackForm");      // сама форма
    const $name = $("#name");              // поле "Имя"
    const $email = $("#email");            // поле "Email"
    const $phone = $("#phone");            // поле "Телефон"
    const $message = $("#message");        // поле "Сообщение"
    const $checkbox = $("#agree");         // чекбокс согласия
    const $submitBtn = $("#submitBtn");    // кнопка отправки формы

    const $nameError = $("#nameError");    // блок для ошибки имени
    const $emailError = $("#emailError");  // блок для ошибки email
    const $messageError = $("#messageError"); // блок для ошибки сообщения

    // ===== ЗАВИСИМОСТЬ ПОЛЕЙ =====
    // Телефон блокируем до ввода имени, вместо element.disabled = true
    $phone.prop("disabled", true); // .prop() используется в jQuery для свойства disabled

    // При вводе в поле "Имя" проверяем, пустое ли оно, и разблокируем телефон
    $name.on("input", function () { //вместо addEventListener("input", fn)
        // Если имя пустое → телефон заблокирован, иначе разблокирован
        $phone.prop("disabled", $name.val().trim() === "");
    });

    // ===== ВАЛИДАЦИЯ ФОРМЫ =====
    function validateForm() {
        let isValid = true; // флаг валидности формы

        // Очищаем предыдущие ошибки
        $nameError.text("");
        $emailError.text("");
        $messageError.text("");

        // Убираем красную подсветку с полей
        $name.removeClass("input-error");
        $email.removeClass("input-error");
        $message.removeClass("input-error");

        // Проверка имени: не пустое
        if ($name.val().trim() === "") {
            $nameError.text("Введите имя"); // показываем текст ошибки
            $name.addClass("input-error");  // красная рамка
            isValid = false;
        }

        // Проверка email
        if ($email.val().trim() === "") {
            $emailError.text("Введите email");
            $email.addClass("input-error");
            isValid = false;
        } else if (!$email.val().includes("@")) {
            // Простая проверка на наличие @
            $emailError.text("Некорректный email");
            $email.addClass("input-error");
            isValid = false;
        }

        // Проверка сообщения
        if ($message.val().trim() === "") {
            $messageError.text("Введите сообщение");
            $message.addClass("input-error");
            isValid = false;
        }

        // Проверка чекбокса (обязателен)
        if (!$checkbox.prop("checked")) {
            isValid = false;
        }

        return isValid; // возвращаем true, если ошибок нет
    }

    // ===== УПРАВЛЕНИЕ КНОПКОЙ =====
    function updateButton() {
        if (validateForm()) {
            // Если форма валидна, кнопка зеленая и активная
            $submitBtn.removeClass("btn-secondary")
                      .addClass("btn-success")
                      .prop("disabled", false);
        } else {
            // Иначе кнопка серая и заблокирована
            $submitBtn.removeClass("btn-success")
                      .addClass("btn-secondary")
                      .prop("disabled", true);
        }
    }

    // Проверяем форму при любом вводе в полях
    $form.on("input", updateButton);

    // Инициализируем состояние кнопки при загрузке
    updateButton();

    // ===== ОБРАБОТКА SUBMIT =====
    $form.on("submit", function (event) {
        event.preventDefault(); // отменяем стандартную отправку формы

        if (!validateForm()) {
            alert("Исправьте ошибки!"); // если форма невалидна, предупреждаем пользователя
            return;
        }

        // Собираем данные формы в объект
        const data = {
            name: $name.val(),
            email: $email.val(),
            phone: $phone.val(),
            message: $message.val(),
            agreed: $checkbox.prop("checked")
        };

        console.log("Данные формы:", data); // выводим объект в консоль
        alert("Форма отправлена!");          // уведомление пользователю

        // Сбрасываем форму и кнопку
        $form[0].reset(); // стандартный метод JS для сброса формы
        updateButton();   // обновляем состояние кнопки после сброса
    });

});