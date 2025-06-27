'use strict';

// Import the render module
import { render } from './render.js'; // Assuming render.js is in the same directory

export const elements = {
    main: null,
    catalog: {
        layout: null,
        data: null,
        search: null,
    },
    cart: {
        layout: null,
        data: null,
        openButton: null,
        closeButton: null,
        summary: null,
    },
    login: {
        layout: null,
    },
};

export const dom = {
    mapElements() {
        elements.main = document.querySelector('main');

        // Catalog elements
        elements.catalog.layout = document.querySelector('#catalog-layout');
        elements.catalog.data = document.querySelector('#catalog-data');
        elements.catalog.search = document.querySelector('#catalog-search');

        // Cart elements
        elements.cart.layout = document.querySelector('#cart-layout');
        elements.cart.data = document.querySelector('#cart-data');
        elements.cart.openButton = document.querySelector('#cart-open');
        elements.cart.closeButton = document.querySelector('#cart-close');
        elements.cart.summary = document.querySelector('#cart-summary');

        // Login elements
        elements.login.layout = document.querySelector('#login-layout');
    },

    attachEventListeners() {
        if (elements.cart.openButton) {
            elements.cart.openButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (elements.catalog.layout) {
                    elements.catalog.layout.classList.toggle('hidden');
                }
                if (elements.cart.layout) {
                    elements.cart.layout.classList.toggle('hidden');
                }

                // Call imported render functions with target elements
                if (elements.cart.data) {
                    render.cart(elements.cart.data);
                }
                if (elements.cart.summary) {
                    render.summary(elements.cart.summary);
                }
            });
        }

        if (elements.cart.closeButton) {
            elements.cart.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (elements.catalog.layout) {
                    elements.catalog.layout.classList.toggle('hidden');
                }
                if (elements.cart.layout) {
                    elements.cart.layout.classList.toggle('hidden');
                }
            });
        }

        document.querySelectorAll('[data-login="true"]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (elements.catalog.layout) {elements.catalog.layout.classList.add('hidden');}
                if (elements.cart.layout) {elements.cart.layout.classList.add('hidden');}
                if (elements.login.layout) {elements.login.layout.classList.remove('hidden');}
            });
        });

        document.querySelectorAll('[data-alert]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                alert(e.target.dataset.alert || 'Action not implemented.');
            });
        });
    },

    init() {
        this.mapElements();
        this.attachEventListeners();
    },
};
