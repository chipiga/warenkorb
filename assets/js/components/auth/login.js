'use strict';

const authLogin = {
    init() {
        document.querySelector('#login-layout form').addEventListener('submit', this.submit.bind(this));
    },
    submit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('[name="email"]').value;
        const password = form.querySelector('[name="password"]').value;
        const remember = form.querySelector('#remember').checked;
        // console.log('Login attempt:', { email, password, remember });

        const url = remember ? './data/login-ok.json' : './data/login-error.json'; 
        // Simulate an AJAX request to login
        ajax.loadJSON(url, (payload) => {
            if (payload.id) {
                // authData.login(email, password);
                // authData.current_user = payload.user; // Simulate successful login
                // render.catalog(catalogData.data); // Refresh catalog view
                elements.loginLayout.classList.add('hidden'); // Hide login layout
                elements.catalogLayout.classList.remove('hidden'); // Show catalog layout
            } else {
                alert('Login failed: ' + payload.message);
            }
        });

        // fetch('https://dummyjson.com/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username: email, // emilys
        //         password: password, // emilyspass
        //         expiresInMins: 30, // optional, defaults to 60
        //     }),
        //     credentials: 'include' // Include cookies (e.g., accessToken) in the request
        // })
        // .then(res => res.json())
        // .then(console.log);
    }

};