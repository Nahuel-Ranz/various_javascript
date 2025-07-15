const buttons = document.querySelectorAll('button');
const input = document.querySelector('input');
const toDisplay = [".", "(", ")", "[", "]", "{", "}"];
const operators = ["+", "-", "*", "/", "^", "%", "=", "!"];

let beforeOperand = 0;
let lastOperator = "";
let waitingNewOperand = false;

const toOperate = (val) => {

    // to delete one or all digits
    if(!operators.includes(val)) {
        if(val == "<") {
            const long = input.value.length;
            if(long > 1) input.value = input.value.substring(0, long-1);
            else input.value = 0;
        } else {
            input.value = 0;
            beforeOperand = 0;
            waitingNewOperand = false;
        } return;
    }
    
    if(!operators.includes(lastOperator)) {
        beforeOperand = input.value;
    } else {
        switch(val) {
            case "+": beforeOperand =parseFloat(beforeOperand) + parseFloat(input.value); break;
            case "-": beforeOperand -= input.value; break;
            case "*": beforeOperand *= input.value; break;
            case "/": beforeOperand /= input.value; break;
            case "^": beforeOperand **= input.value; break;
            case "%": beforeOperand %= input.value; break;
            case "=":
                toOperate(lastOperator);
                lastOperator= "";
                waitingNewOperand= false;
                return;
        }
    }

    input.value = beforeOperand;
    lastOperator = val;
    waitingNewOperand = true;
    
    console.log("beforeOperand: ", beforeOperand, "\nval: "+ val+ "\nlastOperand: "+ lastOperator+ "\nwaitingNewOperand: ", waitingNewOperand, "\nDESDE OPERAR")
}

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;

        // This will be printed in the display.
        if(isDigit(value) || value === ".") {
            if(
                (value === "0" && input.value === "0") ||
                (value === "." && input.value.includes(value))
            ) { return;}
            
            if(
                input.value === "0" &&
                value !== "." ||
                waitingNewOperand
            ) {
                input.value = value;
                waitingNewOperand = false;
            }
            else input.value+= value;
            console.log("beforeOperand: ", beforeOperand, "\nvalue: "+ value+ "\nlastOperand: "+ lastOperator+ "\nwaitingNewOperand: ", waitingNewOperand, "\nDESDE IMPRIMIR")
            return;
        }

        toOperate(value);
    });
});

function isDigit(char) { return char >='0' && char <= '9';}