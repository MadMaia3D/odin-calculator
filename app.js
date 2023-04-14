class Calculator {
    constructor() {
        this.currentInput = "";
        this.numberButtons = document.querySelectorAll(".number");
        this.eraseButton = document.querySelector(".erase");
        this.clearEntryButton = document.querySelector(".clear-entry");

        this.numberInput = this.numberInput.bind(this);
        this.erase = this.erase.bind(this);
        this.clearEntry = this.clearEntry.bind(this);

        this.numberButtons.forEach((button) =>
            button.addEventListener("click", this.numberInput)
        );
        this.eraseButton.addEventListener("click", this.erase);
        this.clearEntryButton.addEventListener("click", this.clearEntry);
    }

    numberInput(event) {
        this.currentInput += event.currentTarget.dataset.number;
        this.logCurrentInput();
    }

    erase() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.logCurrentInput();
    }

    clearEntry() {
        this.currentInput = "";
        this.logCurrentInput();
    }

    logCurrentInput() {
        console.clear();
        console.log(this.currentInput);
    }
}

const calculator = new Calculator();
