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