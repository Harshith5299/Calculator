// CALCULATOR PROGRAM
// This program performs basic arithmetic operations: addition, subtraction, multiplication, and division.
// It takes two numbers and an operator as input and returns the result.
const display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = ''; // Clear the display when called by assingning an empty string//
}

function calculateResult() {
    try {
        // Evaluate the expression in the display   
        const result = eval(display.value);
        display.value = result;
    }
    catch (error) {
        display.value = 'Error'; // Display error if evaluation fails
        setTimeout(() => {
            display.value = '';
        }, 3000); // Clear the display after 3 seconds if there's an error
    }   
}