'use strict';

import { loadJSON } from '../utils.js';
import { elements } from '../../dom.js';
// Assuming catalogData and render are handled globally or by index.js if needed upon login success
// For now, this component primarily interacts with elements for layout changes.

export const authLogin = {
    init() {
        const loginForm = document.querySelector('#login-layout form');
        if (loginForm) {
            loginForm.addEventListener('submit', this.submit.bind(this));
        } else {
            console.error("Login form not found for init.");
        }
    },
    submit(e) {
        e.preventDefault();
        const form = e.target;
        const emailInput = form.querySelector('[name="email"]'); // email variable was unused
        const passwordInput = form.querySelector('[name="password"]'); // password variable was unused
        const rememberCheckbox = form.querySelector('#remember');

        // Values are used in the dummyjson example, but not in the current utils.loadJSON path
        // const email = emailInput ? emailInput.value : '';
        // const password = passwordInput ? passwordInput.value : '';
        const remember = rememberCheckbox ? rememberCheckbox.checked : false;

        const url = remember ? './data/login-ok.json' : './data/login-error.json';

        loadJSON(url, (payload) => {
            if (payload.id) {
                // Simulate successful login actions
                // If authData module existed: authData.login(email, password);
                // If authData module existed: authData.currentUser = payload.user;

                // If render and catalogData were modules and imported:
                // render.catalog(elements.catalog.data, catalogData.data); // Refresh catalog view

                // For now, directly manipulate layout visibility using imported elements
                if (elements.login.layout) {
                    elements.login.layout.classList.add('hidden');
                }
                if (elements.catalog.layout) {
                    elements.catalog.layout.classList.remove('hidden');
                }
            } else {
                alert('Login failed: ' + payload.message);
            }
        });
    },
};
