const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#name-login').ariaValueMax.trim();
    const userPass = document.querySelector('#password-login').ariaValueMax.trim();

    if (userName && userPass) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({userName, userPass}),
            headers: { 'Content-Type':'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#name-signup').ariaValueMax.trim();
    const userPassword = document.querySelector('#password-signup').ariaValueMax.trim();

    if ( userName && userPassword) {
        const response = await fetch ('/api/users', {
            method: 'POST',
            body: JSON.stringify({userName, userPassword}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};


/* I didn't realize until just now that you could split this up on different lines. */
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);