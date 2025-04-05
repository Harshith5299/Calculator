// CALCULATOR PROGRAM
// This program performs basic arithmetic operations: addition, subtraction, multiplication, and division.
// It takes two numbers and an operator as input and returns the result.

// Generate or retrieve a session ID from the query parameter
//The URLSearchParams interface in JavaScript provides a way to work with the query string of a URL. 
// It allows you to parse, manipulate, and construct query parameters in a URL.
const urlParams = new URLSearchParams(window.location.search); // extract the query string from the current page's URL
let sessionId = urlParams.get('device'); // use the .get() method to retrieve the value of a specific query parameter.
let calculator_history_$ = ['']; // Initialize an empty array to store the calculator history
const display = document.getElementById('display'); // Get the display element from the HTML
if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 11); // Generate a new session ID
    urlParams.set('device', sessionId);
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

window.sessionId = sessionId; // Make it globally accessible
console.log(`Session ID: ${sessionId}`); // Debugging: Log the session ID
sessionStorage.setItem('sessionId', sessionId); // Store the session ID in sessionStorage
sessionStorage.setItem('calculator_history', JSON.stringify(calculator_history_$)); // Store the calculator history in sessionStorage

// functions to save and load the state, using sessionId as part of the key
function saveState() {
    sessionStorage.setItem(`calculator_state_${sessionId}`, display.value);
    sessionStorage.setItem('calculator_history', JSON.stringify(calculator_history_$)); // Save the calculator history
    console.log(`Saving state: ${display.value} for sessionId: ${sessionId}`); // Debugging
}

function loadState() {
    const savedValue = sessionStorage.getItem(`calculator_state_${sessionId}`);
    if (savedValue !== null) {
        display.value = savedValue;
    }
    const savedHistory = sessionStorage.getItem('calculator_history');
    if (savedHistory !== null) {
        calculator_history_$ = JSON.parse(savedHistory); // Load the calculator history from sessionStorage
    }
}

// Call loadState when the page loads to restore the user's session state
window.onload = loadState;
let currentIndex = calculator_history_$[calculator_history_$.length - 1]; // Get the current index of the display value in the history initially

//to-do: add a function to scroll through the history of calculations
function scrollHistory(direction) {
    
    if (direction === 'forward') {
        if (currentIndex < calculator_history_$.length - 1) {
            currentIndex++; // Increment the index to scroll forward
            display.value = calculator_history_$[currentIndex]; // Scroll forward in the history
            console.log(`Scrolling forward to index: ${currentIndex}, value: ${display.value}`); // Debugging
        } else {
            console.log(`Already at the latest history entry: ${currentIndex}`); // Debugging
        }    
    }
    else if (direction === 'backward') {
        if (currentIndex > 0) {
            currentIndex--; // Decrement the index to scroll backward
            display.value = calculator_history_$[currentIndex]; // Scroll backward in the history
            console.log(`Scrolling backward to index: ${currentIndex}, value: ${display.value}`); // Debugging
        } else {
            console.log(`Already at the earliest history entry: ${currentIndex}`); // Debugging
        }
    } else {
        console.log(`Invalid scroll direction: ${direction}`); // Debugging
    }
}

// Function to append a value to the display and save the state
function appendToDisplay(value) {
    if (sessionStorage.getItem('sessionId') === sessionId) { // Check if the session ID matches
        display.value += value; // Update the display value
        calculator_history_$.splice(currentIndex + 1); // Clear the history after the current index
        calculator_history_$.push(display.value); // Append the new value to the history
        currentIndex = calculator_history_$.length; // Update the current index to the end of the history
        console.log(`Appending value: ${value}, new display: ${display.value}, calculator history: ${calculator_history_$}, current index: ${currentIndex}`); // Debugging
        saveState(); // Save the updated state for the current session
    } else {
        console.log(`Session ID mismatch. Current: ${sessionId}, Stored: ${sessionStorage.getItem('sessionId')}`); // Debugging
    }
}

// Function to clear the display and save the cleared state
function clearDisplay() {
    if (sessionStorage.getItem('sessionId') === sessionId) { // Check if the session ID matches
        display.value = ''; // Clear the display
        calculator_history_$.splice(currentIndex + 1); // Clear the history after the current index
        calculator_history_$.push(display.value); // Append the new value to the history
        currentIndex = calculator_history_$.length; // Update the current index to the end of the history
        console.log(`Clearing display for sessionId: ${sessionId}`); // Debugging
        saveState(); // Save the cleared state for the current session
    } else {
        console.log(`Session ID mismatch. Current: ${sessionId}, Stored: ${sessionStorage.getItem('sessionId')}`); // Debugging
    }
}

// Function to calculate the result and save the state
function calculateResult() {
    if (sessionStorage.getItem('sessionId') === sessionId) { // Check if the session ID matches
        try {
            const result = eval(display.value); // Evaluate the expression
            display.value = result; // Update the display with the result
            calculator_history_$.splice(currentIndex + 1); // Clear the history after the current index
            calculator_history_$.push(display.value); // Append the new value to the history
            currentIndex = calculator_history_$.length; // Update the current index to the end of the history
            console.log(`Calculated result: ${result} for sessionId: ${sessionId}, calculator history: ${calculator_history_$}, current index: ${currentIndex}`); // Debugging
            saveState(); // Save the calculated result for the current session
        } catch (error) {
            display.value = 'Error'; // Show an error message
            console.log(`Error in calculation for sessionId: ${sessionId}`); // Debugging
            saveState(); // Save the error state for the current session
            setTimeout(() => {
                display.value = ''; // Clear the display after 3 seconds
                calculator_history_$.splice(currentIndex + 1); // Clear the history after the current index
                calculator_history_$.push(display.value); // Append the new value to the history
                currentIndex = calculator_history_$.length; // Update the current index to the end of the history            
                saveState(); // Save the cleared state for the current session
            }, 3000);
        }
    } else {
        console.log(`Session ID mismatch. Current: ${sessionId}, Stored: ${sessionStorage.getItem('sessionId')}`); // Debugging
    }
}

// Function to display the user's unique session ID temporarily
function DisplayUserId() {
    display.value = window.sessionId; // Display the user ID in the calculator display
    console.log(`Displaying sessionId: ${sessionId}`); // Debugging
    setTimeout(() => {
        display.value = ''; // Clear the display after 3 seconds
        calculator_history_$.splice(currentIndex + 1); // Clear the history after the current index
        calculator_history_$.push(display.value); // Append the new value to the history
        currentIndex = calculator_history_$.length; // Update the current index to the end of the history
    }, 3000);
}

//function 