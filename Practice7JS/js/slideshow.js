// 1. После загрузки страницы выводим ссылки, якоря и картинки
window.addEventListener("load", function () {

    console.log("===== ССЫЛКИ НА СТРАНИЦЕ =====");
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        console.log(link.href);
    });

    console.log("===== ЯКОРЯ НА СТРАНИЦЕ =====");
    const anchors = document.querySelectorAll("a[href^='#']");
    anchors.forEach(anchor => {
        console.log(anchor.getAttribute("href"));
    });

    console.log("===== ИЗОБРАЖЕНИЯ НА СТРАНИЦЕ =====");
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        console.log(img.src);
    });

});

// 2. ОБРАБОТЧИКИ СОБЫТИЙ

// Клик по странице
document.addEventListener("click", function(event) {
    console.log("Клик по элементу:", event.target.tagName);
});

// Наведение на изображение
const allImages = document.querySelectorAll("img");

allImages.forEach(img => {
    img.addEventListener("mouseover", function() {
        console.log("Навели мышь на изображение:", img.src);
    });
});

// Нажатие клавиши
document.addEventListener("keydown", function(event) {
    console.log("Нажата клавиша:", event.key);
});


// 3. ПЕРЕЛИСТЫВАНИЕ ФОТО

// Фото первого ученика
const student1Photos = [
    "images4/man4.jpg",
    "images4/man4-2.jpg"
];

let student1Index = 0;

function changeStudent1(direction) {

    if (direction === "next") {
        student1Index++;
    } else {
        student1Index--;
    }

    if (student1Index >= student1Photos.length) {
        student1Index = 0;
    }

    if (student1Index < 0) {
        student1Index = student1Photos.length - 1;
    }

    document.getElementById("student1-img").src = student1Photos[student1Index];
}

// Фото второго ученика
const student2Photos = [
    "images4/woman4.jpg",
    "images4/woman4-2.webp"
];

let student2Index = 0;

function changeStudent2(direction) {

    if (direction === "next") {
        student2Index++;
    } else {
        student2Index--;
    }

    if (student2Index >= student2Photos.length) {
        student2Index = 0;
    }

    if (student2Index < 0) {
        student2Index = student2Photos.length - 1;
    }

    document.getElementById("student2-img").src = student2Photos[student2Index];
}

// ===== СПОСОБ 1: литерал объекта =====
const student = {
    name: "Алексей",
    grade: 8,
    subject: "Математика"
};

console.log("Объект student:", student);


// ===== СПОСОБ 2: через new Object =====
const teacher = new Object();
teacher.name = "Иван";
teacher.subject = "Математика";
teacher.experience = 98;

console.log("Объект teacher:", teacher);


// ===== ДОСТУП К СВОЙСТВАМ =====

// через точку
console.log("Имя ученика:", student.name);

// через квадратные скобки
console.log("Класс ученика:", student["grade"]);


// изменение значения
student.grade = 7;

console.log("Новый класс:", student.grade);

// ===== КОНСТРУКТОР ОБЪЕКТА =====

function Student(name, subject, grade) {

    this.name = name;
    this.subject = subject;
    this.grade = grade;

    this.showInfo = function() {
        console.log("Ученик:", this.name);
        console.log("Предмет:", this.subject);
        console.log("Оценка:", this.grade);
    };

}

// создаем объекты
const student1 = new Student("Алексей", "Русский", 4);
const student2 = new Student("Мария", "Математика", 5);

// вызываем метод
student1.showInfo();
student2.showInfo();

// ===== РАСШИРЕНИЕ ARRAY =====

Array.prototype.average = function () {

    let sum = 0;

    for (let i = 0; i < this.length; i++) {
        sum += this[i];
    }

    return sum / this.length;
};


// проверка
const marks = [5, 4, 5, 3, 5];

console.log("Средняя оценка:", marks.average());
