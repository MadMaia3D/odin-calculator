class Calculator {
    constructor() {
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperator = "";
        this.DISPLAY_LIMIT = 16;

        this.querySelectDomElements();
        this.bindMethods();
        this.addEventListenerToButtons();

        this.clearAll();
    }

    querySelectDomElements() {
        this.displayTop = document.querySelector(".display .top-row");
        this.displayBottom = document.querySelector(".display .bottom-row");

        this.numberButtons = document.querySelectorAll(".number");
        this.separatorButton = document.querySelector(".separator");
        this.operatorButtons = document.querySelectorAll(".operator");
        this.equalsButton = document.querySelector(".equals");
        this.clearButton = document.querySelector(".function.clear");
        this.eraseButton = document.querySelector(".function.erase");
        this.clearEntryButton = document.querySelector(".function.clear-entry");
    }

    bindMethods() {
        this.insertNumber = this.insertNumber.bind(this);
        this.insertSeparator = this.insertSeparator.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.eraseLastDigit = this.eraseLastDigit.bind(this);
        this.inputOperator = this.inputOperator.bind(this);
        this.inputEquals = this.inputEquals.bind(this);
        this.clearEntry = this.clearEntry.bind(this);
    }

    addEventListenerToButtons() {
        this.separatorButton.addEventListener("click", this.insertSeparator);
        this.clearButton.addEventListener("click", this.clearAll);
        this.eraseButton.addEventListener("click", this.eraseLastDigit);

        this.numberButtons.forEach((button) => {
            button.addEventListener("click", this.insertNumber);
        });
        this.operatorButtons.forEach((button) => {
            button.addEventListener("click", this.inputOperator);
        });
        this.equalsButton.addEventListener("click", this.inputEquals);
        this.clearEntryButton.addEventListener("click", this.clearEntry);
    }

    insertNumber(event) {
        const pressedNumber = event.currentTarget.dataset.number;
        if (this.currentInput === "" && pressedNumber === "0") return;

        if (this.currentInput.length >= this.DISPLAY_LIMIT) return;
        this.currentInput += pressedNumber;

        this.updateDisplay();
    }

    insertSeparator() {
        if (this.currentInput.includes(".")) return;
        if (this.currentInput === "") this.currentInput += "0";
        this.currentInput += ".";
        this.updateDisplay();
    }

    inputOperator(event) {
        const operator = event.currentTarget.dataset.operation;
        if (this.currentInput === "" && this.previousInput === "") {
            return;
        }
        if (this.currentInput === "" && this.currentOperator) {
            this.currentOperator = operator;
            this.updateDisplay();
            return;
        }
        if (this.currentOperator) {
            this.inputEquals();
        }

        this.currentOperator = operator;

        let formattedInput = this.removeLeadingZeros(this.currentInput);
        formattedInput = this.removeTrailingZeros(this.currentInput);

        this.previousInput = formattedInput;
        this.currentInput = "";
        this.updateDisplay();
    }

    inputEquals() {
        const operator = this.currentOperator;
        if (!operator) return;
        const result = this.calculate();
        if (result == null) return;

        if (result === 0) {
            this.currentInput = "";
        } else {
            this.currentInput = result.toString();
        }

        this.previousInput = "";
        this.currentOperator = "";
        this.updateDisplay();
    }

    eraseLastDigit() {
        if (this.currentInput === "0.") {
            this.currentInput = "";
        }
        if (this.currentInput.length > 0) {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        this.updateDisplay();
    }

    calculate() {
        const operator = this.currentOperator;
        const number1 = Number(this.previousInput);
        const number2 = this.currentInput ? Number(this.currentInput) : 0;

        if (operator === "/" && number2 === 0) return;

        let result = 0;
        switch (operator) {
            case "/":
                result = this.divide(number1, number2);
                break;
            case "*":
                result = this.multiply(number1, number2);
                break;
            case "+":
                result = this.add(number1, number2);
                break;
            case "-":
                result = this.subtract(number1, number2);
                break;
            default:
                result = null;
        }
        return result;
    }

    add(number1, number2) {
        return number1 + number2;
    }
    subtract(number1, number2) {
        return number1 - number2;
    }
    multiply(number1, number2) {
        return number1 * number2;
    }
    divide(number1, number2) {
        return number1 / number2;
    }

    updateDisplay() {
        this.updateDisplayBottom();
        this.updateDisplayTop();
    }

    updateDisplayTop() {
        this.displayTop.textContent = this.previousInput;

        if (this.currentOperator) {
            let operator = this.currentOperator;
            const divisionSymbol = "\u{00F7}";
            const multiplicationSymbol = "\u{00D7}";
            operator = operator.replace(/\//g, divisionSymbol);
            operator = operator.replace(/\*/g, multiplicationSymbol);
            this.displayTop.textContent += operator;
        }
    }

    updateDisplayBottom() {
        this.displayBottom.textContent = this.currentInput;

        if (this.currentInput === "") {
            this.displayBottom.textContent = "0";
            this.displayBottom.classList.add("empty-input");
        } else {
            this.displayBottom.classList.remove("empty-input");
        }

        if (this.currentInput.length > this.DISPLAY_LIMIT) {
            const horizontalEllipsisSymbol = "\u{2026}";
            const displayValue = this.currentInput.slice(0, this.DISPLAY_LIMIT);
            this.displayBottom.textContent = displayValue;
            this.displayBottom.textContent += horizontalEllipsisSymbol;
        } else {
            this.displayBottom.textContent += " ";
        }
    }

    clearAll() {
        this.displayBottom.classList.remove("show-error");
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperator = "";
        this.updateDisplay();
    }

    clearEntry() {
        this.currentInput = "";
        this.updateDisplay();
    }

    removeLeadingZeros(string) {
        const isStringEmpty = string === "";
        const isStringZero = string === "0";
        if (isStringEmpty || isStringZero) {
            return string;
        }

        let output = string;
        while (output[0] === "0") {
            output = output.slice(1);
        }

        const isOutputEmpty = output === "";
        if (isOutputEmpty) {
            return "0";
        }

        if (output[0] === ".") {
            output = "0" + output;
        }
        return output;
    }
    removeTrailingZeros(string) {
        const isStringEmpty = string === "";
        const isStringZero = string === "0";
        const isStringNotDecimal = !string.includes(".");
        if (isStringEmpty || isStringZero || isStringNotDecimal) {
            return string;
        }

        let output = string;
        while (output[output.length - 1] === "0") {
            output = output.slice(0, -1);
        }

        if (output[output.length - 1] === ".") {
            output = output.slice(0, -1);
        }

        if (output == "") {
            return "0";
        }
        return output;
    }
}

const calculator = new Calculator();
