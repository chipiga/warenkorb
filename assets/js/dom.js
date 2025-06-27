'use strict';

import { render } from './render.js';
import eventEmitter from './eventEmitter.js';
// Assuming the intention was that 'elements' is defined and exported by this module,
// not imported from a separate 'dom-elements.js'.
// If 'dom-elements.js' was a real file, its content should be merged here or imported correctly.
// For this refactor, I will assume 'elements' is defined and exported from this file.
// Removing the problematic import and using a locally defined 'elements' which is exported.

export const elements = { // Changed pageElements back to elements to match export
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
        elements.catalog.layout = document.querySelector('#catalog-layout');
        elements.catalog.data = document.querySelector('#catalog-data');
        elements.catalog.search = document.querySelector('#catalog-search');
        elements.cart.layout = document.querySelector('#cart-layout');
        elements.cart.data = document.querySelector('#cart-data');
        elements.cart.openButton = document.querySelector('#cart-open');
        elements.cart.closeButton = document.querySelector('#cart-close');
        elements.cart.summary = document.querySelector('#cart-summary');
        elements.login.layout = document.querySelector('#login-layout');
    },

    attachEventListeners() {
        if (elements.cart.openButton) {
            elements.cart.openButton.addEventListener('click', (e) => {
                e.preventDefault();
                eventEmitter.emit('ui:openCartView');
            });
        }

        if (elements.cart.closeButton) {
            elements.cart.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                eventEmitter.emit('ui:closeCartView');
            });
        }

        document.querySelectorAll('[data-login="true"]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                eventEmitter.emit('ui:openLoginView');
            });
        });

        document.querySelectorAll('[data-alert]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                alert(e.target.dataset.alert || 'Action not implemented.');
            });
        });
    },

    subscribeToAppEvents() {
        // Data event subscriptions
        eventEmitter.on('cartChanged', (_cartData) => {
            if (elements.cart.data) {
                render.cart(elements.cart.data);
            }
            if (elements.cart.summary) {
                render.summary(elements.cart.summary);
            }
        });

        // UI Navigation Event Subscriptions
        eventEmitter.on('ui:openCartView', () => {
            if (elements.catalog.layout) {
                elements.catalog.layout.classList.add('hidden'); // Explicitly hide catalog
            }
            if (elements.cart.layout) {
                elements.cart.layout.classList.remove('hidden'); // Explicitly show cart
            }
            if (elements.login.layout) { // Ensure login is hidden if navigating to cart
                elements.login.layout.classList.add('hidden');
            }
            // Ensure cart is rendered with latest data when opened
            if (elements.cart.data) {
                render.cart(elements.cart.data);
            }
            if (elements.cart.summary) {
                render.summary(elements.cart.summary);
            }
        });

        eventEmitter.on('ui:closeCartView', () => {
            if (elements.catalog.layout) {
                elements.catalog.layout.classList.remove('hidden'); // Show catalog
            }
            if (elements.cart.layout) {
                elements.cart.layout.classList.add('hidden'); // Hide cart
            }
        });

        eventEmitter.on('ui:openLoginView', () => {
            if (elements.catalog.layout) elements.catalog.layout.classList.add('hidden');
            if (elements.cart.layout) elements.cart.layout.classList.add('hidden');
            if (elements.login.layout) elements.login.layout.classList.remove('hidden');
        });
    },

    init() {
        this.mapElements();
        this.attachEventListeners();
        this.subscribeToAppEvents();
    },
};
