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

        // If the last array item is a number, append the digit to it
        // If the last array item is an operator, push the digit to the array
    }

    operatorInput(event) {
        this.input = event.currentTarget.dataset.operation;
        console.log(input);
        // If the array is empty, don't do anything
        // If the last array item is a number, push the operator to the array
        // If the last array items is an operator, substitute it with the new operator
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
