class Calculator {
    constructor() {
        this.currentInput = "";
        this.lastInput = "";
        this.currentOperator = "";

        this.querySelectDomElements();
        this.bindMethods();
        this.addEventListenerToButtons();

        this.clearAll();
    }

    querySelectDomElements() {
        this.displayTop = document.querySelector(".display .top-row");
        this.displayBottom = document.querySelector(".display .bottom-row");

        this.clearButton = document.querySelector(".function.clear");
        this.numberButtons = document.querySelectorAll(".number");
        this.separatorButton = document.querySelector(".separator");
    }

    bindMethods() {
        this.insertNumber = this.insertNumber.bind(this);
        this.insertSeparator = this.insertSeparator.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
    }

    addEventListenerToButtons() {
        this.numberButtons.forEach((number) => {
            number.addEventListener("click", this.insertNumber);
        });
        this.separatorButton.addEventListener("click", this.insertSeparator);

        this.clearButton.addEventListener("click", this.clearAll);
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

    updateDisplay() {
        this.displayBottom.textContent = this.currentInput;
        if (this.currentInput === "") {
            this.displayBottom.textContent = "0";
        }
    }

    clearAll() {
        this.currentInput = "";
        this.lastInput = "";
        this.updateDisplay();
    }
}

const calculator = new Calculator();
