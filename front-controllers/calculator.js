const buttons = document.querySelectorAll('button');
const input = document.querySelector('input');
const charts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "(", ")", "[", "]", "{", "}"];
const operators = ["+", "-", "*", "/", "^", "%", "=", "!"];

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;

        
        input.value+= value;
    });
});