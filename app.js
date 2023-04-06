class Calculator {
    constructor(displayTop, displayMiddle, displayBottom) {
        this.displayTop = displayTop;
        this.displayMiddle = displayMiddle;
        this.displayBottom = displayBottom;
        this.firstOperand = "";
        this.secondOperand = "";
        this.operator = "";
    }

    appendNumber(entry) {
        if (entry === "." && this.firstOperand.includes(".")) return;
        if (entry === "." && !this.firstOperand) this.firstOperand += "0";
        this.firstOperand += entry.toString();
    }

    selectOperand(entry) {
        if (this.operator && this.operator != entry) {
            this.operator = entry;
            return;
        }
        this.operator = entry;
        if (this.displayTop.textContent && this.displayBottom.textContent) {
            this.operate();
            return;
        }
        this.secondOperand = this.displayBottom.textContent;
        this.firstOperand = "";
    }
    operate() {
        const lhs = Number(this.displayTop.textContent);
        const rhs = Number(this.displayBottom.textContent);
        let result;
        switch (this.operator) {
            case "+":
                result = lhs + rhs;
                break;
            case "-":
                result = lhs - rhs;
                break;
            case "x":
                result = lhs * rhs;
                break;
            case "/":
                result = lhs / rhs;
                break;
            default:
                break;
        }
        if (result) {
            this.secondOperand = this.formatNumber(result);
        }
        this.firstOperand = "";
    }

    formatNumber(number) {
        return Number(number.toFixed(8));
    }

    updateDisplayTop() {
        this.displayTop.textContent = this.formatNumber(
            Number(this.secondOperand)
        );
    }
    updateDisplayMiddle() {
        this.displayMiddle.textContent = this.operator;
    }
    updateDisplayBottom() {
        this.displayBottom.textContent = this.firstOperand;
    }
    updateDisplay() {
        this.updateDisplayTop();
        this.updateDisplayMiddle();
        this.updateDisplayBottom();
    }
    clear() {
        this.firstOperand = "";
        this.secondOperand = "";
        this.operator = "";
        this.displayTop.innerText = "";
        this.displayMiddle.innerText = "";
        this.displayBottom.innerText = "0";
    }
}

const displayTop = document.querySelector("[data-display-top]");
const displayMiddle = document.querySelector("[data-display-middle]");
const displayBottom = document.querySelector("[data-display-bottom]");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");

numberButtons.forEach(function (button) {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplayBottom();
    });
});

operatorButtons.forEach(function (button) {
    button.addEventListener("click", () => {
        calculator.selectOperand(button.textContent);
        calculator.updateDisplayTop();
        calculator.updateDisplayMiddle();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.operate();
    calculator.updateDisplayTop();
});

clearButton.addEventListener("click", () => {
    calculator.clear();
});

const calculator = new Calculator(displayTop, displayMiddle, displayBottom);
