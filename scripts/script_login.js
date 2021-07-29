window.onload = () => {
    const form = document.forms.formLogin;

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        showSpinner();

        const email = form.email.value;
        const password = form.password.value;
        const body = {
            email,
            password,
        }

        RequestManager.post('/users/login', body).then(data => {
            localStorage.setItem('token', data.jwt)
            hideSpinner();
            location.href = './tasks-list.html';
        }).catch(err => {
            console.log(err);
            hideSpinner();
        })
    })
}

//USUARIOS CREADOS EN CLASE
//anto@tester.com
//12345678

//anto@email.com
//32165487

//Otra alternativa:
//fer@dh.com
//12345678
