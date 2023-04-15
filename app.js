class Calculator {
    constructor() {
        this.currentInput = "";
        this.inputs = [];

        this.numberButtons = document.querySelectorAll(".number");
        this.operatorButtons = document.querySelectorAll(".operator");
        this.eraseButton = document.querySelector(".erase");
        this.clearEntryButton = document.querySelector(".clear-entry");

        this.numberInput = this.numberInput.bind(this);
        this.operatorInput = this.operatorInput.bind(this);
        this.erase = this.erase.bind(this);
        this.clearEntry = this.clearEntry.bind(this);

        this.numberButtons.forEach((button) =>
            button.addEventListener("click", this.numberInput)
        );
        this.operatorButtons.forEach((button) =>
            button.addEventListener("click", this.operatorInput)
        );
        this.eraseButton.addEventListener("click", this.erase);
        this.clearEntryButton.addEventListener("click", this.clearEntry);
    }

    numberInput(event) {
        const currentInput = event.currentTarget.dataset.number;

        // If the array is empty or if the last array item is an operator, push the digit to the array
        if (this.isInputsEmpty() || this.isLastInputOperator()) {
            this.inputs.push(currentInput);
            console.log(this.inputs);
            return;
        }
        // If the last array item is a number, append the digit to it
        this.appendDigit(currentInput);
        console.log(this.inputs);
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

    operatorInput(event) {
        this.currentInput = event.currentTarget.dataset.operation;

        // If the array is empty, don't do anything
        if (this.isInputsEmpty()) return;
        // If the last array item is a number, push the operator to the array
        if (this.isLastInputNumeric()) {
            this.inputs.push(this.currentInput);
        }
        // If the last array items is an operator, substitute it with the new operator
        if (this.isLastInputOperator()) {
            this.setLastInput(this.currentInput);
        }
        console.log(this.inputs);
    }

    equals() {
        // if array is empty don't do nothing, just return
        // if last item on the array is an operator, delete it before continuing
        // now if array has more than one item, calculate the equation stored in the array
        // else if array has only one item, the result is the item itself
    }

    erase() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.logCurrentInput();
        /*
        If the array is empty, don't do anything
        - If the last array item is an operator, delete it
           - else if the last array item is not empty, erase the last digit of it
               - if the last array item is empty, delete it
        */
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
