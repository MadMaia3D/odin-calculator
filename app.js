function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    const operations = { "+": add, "-": subtract, "*": multiply, "/": divide };
    const result = operations[operator](Number(number1), Number(number2));
    return result;
}

let first_input = "";

const displayCurrentInput = document.querySelector(".display .current-input");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    if (button.classList.contains("digit")) {
        button.addEventListener("click", addDigit);
    }

    if (button.classList.contains("clear")) {
        button.addEventListener("click", clear);
    }
});

function addDigit(event) {
    first_input += event.target.dataset.number;
    displayCurrentInput.textContent = first_input;
}

function clear() {
    first_input = "";
    displayCurrentInput.textContent = "0";
}
