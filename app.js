class Calculator {
    constructor() {
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperator = "";

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
    }

    bindMethods() {
        this.insertNumber = this.insertNumber.bind(this);
        this.insertSeparator = this.insertSeparator.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.eraseLastDigit = this.eraseLastDigit.bind(this);
        this.inputOperator = this.inputOperator.bind(this);
        this.inputEquals = this.inputEquals.bind(this);
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
    }

    insertNumber(event) {
        const pressedNumber = event.currentTarget.dataset.number;
        if (this.currentInput === "" && pressedNumber === "0") return;

        if (this.currentInput.length >= 17) return;
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
        if (this.currentOperator) {
            this.inputEquals();
            return;
        }

        const operator = event.currentTarget.dataset.operation;
        this.currentOperator = operator;

        const formattedInput = Number(this.currentInput).toString();

        this.previousInput = formattedInput;
        this.currentInput = "";
        this.updateDisplay();
    }

    inputEquals() {
        const operator = this.currentOperator;
        if (!operator) return;
        const result = this.calculate();
        if (!result) return;

        this.previousInput = "";
        this.currentOperator = "";
        this.currentInput = result.toString();
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
        this.displayBottom.textContent = this.currentInput;
        if (this.currentInput === "") {
            this.displayBottom.textContent = "0";
        }
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

    eraseLastDigit() {
        if (this.currentInput === "0.") {
            this.currentInput = "";
        }
        if (this.currentInput.length > 0) {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        this.updateDisplay();
    }

    clearAll() {
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperator = "";
        this.updateDisplay();
    }
}

const calculator = new Calculator();
