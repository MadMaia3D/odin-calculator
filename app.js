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
        const operator = event.currentTarget.dataset.operation;
        this.currentOperator = operator;

        const formattedInput = Number(this.currentInput).toString();
        let displayValue = `${formattedInput}${operator}`;

        const divisionSymbol = "\u{00F7}";
        const multiplicationSymbol = "\u{00D7}";

        displayValue = displayValue.replace(/\//g, divisionSymbol);
        displayValue = displayValue.replace(/\*/g, multiplicationSymbol);

        this.previousInput = displayValue;
        this.currentInput = "";
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayBottom.textContent = this.currentInput;
        if (this.currentInput === "") {
            this.displayBottom.textContent = "0";
        }
        this.displayTop.textContent = this.previousInput;
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
