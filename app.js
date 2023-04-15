class Calculator {
    constructor() {
        this.inputs = [];

        this.numberButtons = document.querySelectorAll(".number");
        this.separatorButton = document.querySelector(".separator");
        this.operatorButtons = document.querySelectorAll(".operator");
        this.eraseButton = document.querySelector(".erase");
        this.clearEntryButton = document.querySelector(".clear-entry");
        this.displayTopRow = document.querySelector(".display .top-row");

        this.numberInput = this.insertNumber.bind(this);
        this.insertDecimalSeparator = this.insertDecimalSeparator.bind(this);
        this.operatorInput = this.insertOperator.bind(this);
        this.erase = this.erase.bind(this);
        this.clearEntry = this.clearEntry.bind(this);
        this.displayCurrentInput = this.displayCurrentInput.bind(this);

        this.numberButtons.forEach((button) =>
            button.addEventListener("click", (event) => {
                this.insertNumber(event);
                this.displayCurrentInput();
            })
        );
        this.separatorButton.addEventListener("click", () => {
            this.insertDecimalSeparator();
            this.displayCurrentInput();
        });
        this.operatorButtons.forEach((button) =>
            button.addEventListener("click", (event) => {
                this.insertOperator(event);
                this.displayCurrentInput();
            })
        );
        this.eraseButton.addEventListener("click", () => {
            this.erase();
            this.displayCurrentInput();
        });
        this.clearEntryButton.addEventListener("click", () => {
            this.clearEntry();
            this.displayCurrentInput();
        });
    }

    insertNumber(event) {
        const currentInput = event.currentTarget.dataset.number;

        // If the array is empty or if the last array item is an operator, push the digit to the array
        if (this.isInputsEmpty() || this.isLastInputOperator()) {
            this.inputs.push(currentInput);
            return;
        }
        // If the last array item is a number, append the digit to it
        this.appendDigit(currentInput);
    }
    insertDecimalSeparator() {
        // if last input is an operator, insert new number
        if (this.isInputsEmpty() || this.isLastInputOperator()) {
            this.inputs.push("");
        }
        // if the input is empty, insert a zero, the separator, and return
        if (!this.getLastInput()) {
            this.appendDigit("0");
            this.appendDigit(".");
        }
        // if the last input already doesn't have a decimal operator, insert it

        if (!this.getLastInput().includes(".")) {
            this.appendDigit(".");
        }
    }

    isInputsEmpty() {
        return !Boolean(this.inputs.length);
    }
    isLastInputNumeric() {
        const lastInput = this.getLastInput();
        return !isNaN(lastInput);
    }
    isLastInputOperator() {
        const lastInput = this.getLastInput();
        const regexp = new RegExp(/[/*\-+]/g);
        return regexp.test(lastInput);
    }
    getLastInput() {
        const lastIndex = this.inputs.length - 1;
        const lastInput = this.inputs[lastIndex];
        return lastInput;
    }
    setLastInput(value) {
        const lastIndex = this.inputs.length - 1;
        this.inputs[lastIndex] = value;
    }
    appendDigit(digit) {
        const lastIndex = this.inputs.length - 1;
        this.inputs[lastIndex] += digit;
    }

    insertOperator(event) {
        const currentInput = event.currentTarget.dataset.operation;

        // If the array is empty, don't do anything
        if (this.isInputsEmpty()) {
            return;
        }
        // If the last array item is a number, format it to number then push the operator to the array
        if (this.isLastInputNumeric()) {
            this.setLastInput(Number(this.getLastInput()).toString());
            this.inputs.push(currentInput);
        }
        // If the last array items is an operator, substitute it with the new operator
        if (this.isLastInputOperator()) {
            this.setLastInput(currentInput);
        }
    }

    equals() {
        // if array is empty don't do nothing, just return
        // if last item on the array is an operator, delete it before continuing
        // now if array has more than one item, calculate the equation stored in the array
        // else if array has only one item, the result is the item itself
    }

    erase() {
        // If the array is empty, don't do anything
        if (this.isInputsEmpty()) {
            return;
        }
        // If the last array item is an operator, delete it
        if (this.isLastInputOperator()) {
            this.inputs = this.inputs.slice(0, -1);
            return;
        }
        // if the last array item is not empty, erase the last digit of it
        // then if the last array item is empty, delete it
        if (this.isLastInputNumeric()) {
            const newValue = this.getLastInput().slice(0, -1);
            this.setLastInput(newValue);
            if (this.getLastInput().length === 0) {
                this.inputs = this.inputs.slice(0, -1);
            }
        }
    }

    clearEntry() {
        this.inputs = [];
    }

    displayCurrentInput() {
        const displayValue = this.inputs.join(" ");
        this.displayTopRow.textContent = displayValue;
    }
}

const calculator = new Calculator();
