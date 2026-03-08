// ===== СЛАЙДШОУ ДЛЯ 1 УЧЕНИКА =====
const student1Photos = [
    "images4/man4.jpg",
    "images4/man4-2.jpg"
];

let student1Index = 0;

function changeStudent1(direction) {

    if (direction === "next") {
        student1Index++;
    } else if (direction === "prev") {
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


// ===== СЛАЙДШОУ ДЛЯ 2 УЧЕНИКА =====
const student2Photos = [
    "images4/woman4.jpg",
    "images4/woman4-2.webp"
];

let student2Index = 0;

function changeStudent2(direction) {

    if (direction === "next") {
        student2Index++;
    } else if (direction === "prev") {
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