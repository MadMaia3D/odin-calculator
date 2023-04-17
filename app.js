class Calculator {
    constructor() {
        this.currentInput = "";
        this.lastInput = "";

        this.displayTop = document.querySelector(".display .top-row");
        this.displayBottom = document.querySelector(".display .bottom-row");

        this.numberButtons = document.querySelectorAll(".number");
        this.clearButton = document.querySelector(".function.clear");

        this.inputNumber = this.inputNumber.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);

        this.numberButtons.forEach((number) => {
            number.addEventListener("click", this.inputNumber);
        });

        this.clearButton.addEventListener("click", this.clearAll);
    }

    inputNumber(event) {
        this.currentInput += event.currentTarget.dataset.number;
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayBottom.textContent = this.currentInput;
    }

    clearAll() {
        this.currentInput = "";
        this.lastInput = "";
        this.updateDisplay();
    }
}

const calculator = new Calculator();
