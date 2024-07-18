
// Creating a button element
const button = document.createElement('button');

button.classList.add('styled-button');

// Creating an anchor element
const anchor = document.createElement('a');
anchor.setAttribute('href', '{{SCHEMES}}://{{HOST}}/login');
anchor.textContent = 'Login with github';

// Styling the anchor element
anchor.style.textDecoration = 'none'; // Remove underline

// Appending anchor to the button
button.appendChild(anchor);

// Appending button to the document body
document.body.appendChild(button);