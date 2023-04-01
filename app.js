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
