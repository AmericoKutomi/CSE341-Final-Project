
// Creating a button element
const button = document.createElement('button');
button.textContent = 'Login with github';

// Adding styles using class
button.classList.add('styled-button');


// Adding event listener
button.addEventListener('click', function() {
    alert('Welcome to API School Management System');
});

// Appending button to the document body
document.body.appendChild(button);