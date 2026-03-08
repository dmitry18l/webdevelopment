// Функции для работы с последовательностью
function findSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    return sum;
}

function findMin(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) if (arr[i] < min) min = arr[i];
    return min;
}

function findSecondMax(arr) {
    let max = Math.max(...arr); // самое большое число
    let secondMax = Math.min(...arr); // начинаем с самого маленького
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > secondMax && arr[i] < max) {
            secondMax = arr[i];
        }
    }
    return secondMax;
}

// Проверяем
let numbers = [1000, 2, 8, 1, 9, 3];
console.log("Числа: " + numbers);
// Задание 1
console.log("Сумма: " + findSum(numbers));
// Задание 2
console.log("Минимум: " + findMin(numbers));
console.log("Минимум: " + Math.min(...numbers));
// Задание 3
console.log("Второй по величине: " + findSecondMax(numbers));