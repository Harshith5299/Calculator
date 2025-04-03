// CALCULATOR PROGRAM
// This program performs basic arithmetic operations: addition, subtraction, multiplication, and division.
// It takes two numbers and an operator as input and returns the result.

// Generate or retrieve a session ID from the query parameter
//The URLSearchParams interface in JavaScript provides a way to work with the query string of a URL. 
// It allows you to parse, manipulate, and construct query parameters in a URL.
const urlParams = new URLSearchParams(window.location.search); // extract the query string from the current page's URL
let sessionId = urlParams.get('device'); // use the .get() method to retrieve the value of a specific query parameter.
if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 11); // Generate a new session ID
    urlParams.set('device', sessionId);
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

window.sessionId = sessionId; // Make it globally accessible
console.log(`Session ID: ${sessionId}`); // Debugging: Log the session ID
sessionStorage.setItem('sessionId', sessionId); // Store the session ID in sessionStorage

// Save and load state as before, using sessionId as part of the key
function saveState() {
    sessionStorage.setItem(`calculator_state_${sessionId}`, display.value);
}

function loadState() {
    const savedValue = sessionStorage.getItem(`calculator_state_${sessionId}`);
    if (savedValue !== null) {
        display.value = savedValue;
    }
}

// Call loadState when the page loads to restore the user's session state
window.onload = loadState;

// Function to append a value to the display and save the state
function appendToDisplay(value) {
    if (sessionStorage.getItem('sessionId') === sessionId) { // Check if the session ID matches
        display.value += value; // Update the display value
        console.log(`Appending value: ${value}, new display: ${display.value}`); // Debugging
        saveState(); // Save the updated state for the current session
    } else {
        console.log(`Session ID mismatch. Current: ${sessionId}, Stored: ${sessionStorage.getItem('sessionId')}`); // Debugging
    }
}

// Function to clear the display and save the cleared state
function clearDisplay() {
    if (sessionStorage.getItem('sessionId') === sessionId) { // Check if the session ID matches
        display.value = ''; // Clear the display
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
            console.log(`Calculated result: ${result} for sessionId: ${sessionId}`); // Debugging
            saveState(); // Save the calculated result for the current session
        } catch (error) {
            display.value = 'Error'; // Show an error message
            console.log(`Error in calculation for sessionId: ${sessionId}`); // Debugging
            saveState(); // Save the error state for the current session
            setTimeout(() => {
                display.value = ''; // Clear the display after 3 seconds
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
    }, 3000);
}