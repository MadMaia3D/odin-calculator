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

let currentInput = "";

const displayCurrentInput = document.querySelector(".display .current-input");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    if (button.classList.contains("digit")) {
        button.addEventListener("click", addDigit);
    } else if (button.classList.contains("separator")) {
        button.addEventListener("click", addSeparator);
    } else if (button.classList.contains("clear")) {
        button.addEventListener("click", clear);
    }
});

function addDigit(event) {
    const digitInput = event.target.dataset.number;
    currentInput += digitInput;
    currentInput = removeTrailingZeros(currentInput);
    displayCurrentInput.textContent = currentInput;
}

function removeTrailingZeros(stringNumber) {
    return Number(stringNumber).toString();
}

function addSeparator() {
    if (currentInput.includes(".")) {
        return;
    }
    if (currentInput.length === 0) {
        currentInput += "0";
    }
    currentInput += ".";
    displayCurrentInput.textContent = currentInput;
}

function clear() {
    currentInput = "";
    displayCurrentInput.textContent = "0";
}
