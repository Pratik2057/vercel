const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const buttonpop = document.querySelector('.login-bu');
const closeButton = document.querySelector('.icon-close');


console.log(wrapper, loginlink, registerlink, buttonpop); // Check if all elements are correctly selected

registerlink.addEventListener('click', () => {
    console.log('Register link clicked');
    wrapper.classList.add('active');
});

loginlink.addEventListener('click', () => {
    console.log('Login link clicked');
    wrapper.classList.remove('active');
});

buttonpop.addEventListener('click', () => {
    console.log('Login button clicked');
    wrapper.classList.add('active-popup');
});

closeButton.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});


// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Login failed');
    }
});

// Handle Registration Form Submission
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Registration failed');
    }
});
