window.onload = () => {
    const form = document.forms.formLogin;
    const signinButton = document.querySelector('#submit');

    const name = form.name;
    const lastname = form.lastname;
    const password = form.password;
    const repeatPassword = form.repeatPassword;
    const email = form.email;
    const userData = new UserData();

    name.addEventListener("keyup", () => {
        nameValidation(name) ? signinButton.disabled = false : signinButton.disabled = true;
    });

    lastname.addEventListener("keyup", () => {
        nameValidation(lastname) ? signinButton.disabled = false : signinButton.disabled = true;
    });

    email.addEventListener("keyup", () => {
        emailValidation(email) ? signinButton.disabled = false : signinButton.disabled = true;
    });

    password.addEventListener('mouseout', () => {
        passwordValidation(password, repeatPassword) ? signinButton.disabled = false : signinButton.disabled = true;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showSpinner();

        userData.setFirstName(name.value.trim());
        userData.setLastName(lastname.value.trim());
        userData.setPassword(password.value);
        userData.setEmail(email.value.trim());

        RequestManager.post('/users', userData).then(data => {
            localStorage.setItem('token', data.jwt)
            hideSpinner();
            location.href = './tasks-list.html';
        }).catch(err => {
            console.log(err);
            hideSpinner();
        });
    });
}

function nameValidation(field) {
    const expression = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const test = expression.test(field.value);

    !test ? field.classList.add("error") : field.classList.remove("error");

    return test;
}

function emailValidation(email) {
    const expression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const test = expression.test(email.value);

    !test ? email.classList.add("error") : email.classList.remove("error");

    return test;
}

function passwordValidation(password, repeatPassword) {
    const expression = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;
    const test = expression.test(password.value);
    const coincidence = password.value == repeatPassword.value;

    !test ? password.classList.add("error") : password.classList.remove("error");
    !coincidence ? repeatPassword.classList.add("error") : repeatPassword.classList.remove("error");

    return test && coincidence;
}

//USUARIOS CREADOS PARA VERSIÓN FINAL
//Salvador 
//Tester
//Tester123
//salvador@tester.com

//Tadeo
//Tester
//Tester123
//tadeo@tester.com