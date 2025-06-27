'use strict';

// Import necessary core modules
import { dom, elements } from './dom.js';
import { render } from './render.js';
import eventEmitter from './eventEmitter.js'; // Import the event emitter

// Import component modules
import { catalogData } from './components/catalog/data.js';
import { catalogIndex } from './components/catalog/index.js';
import { authLogin } from './components/auth/login.js';

const init = () => {
    // Initialize DOM elements and event listeners
    dom.init();

    // Subscribe to productsLoaded event to render catalog
    eventEmitter.on('productsLoaded', (loadedProducts) => {
        if (elements && elements.catalog && elements.catalog.data) {
            render.catalog(elements.catalog.data, loadedProducts);
        } else {
            console.error("Cannot render catalog: elements.catalog.data not found or event data missing.");
        }
    });

    // Catalog Index initialization (e.g., for search listeners)
    // This should ideally run after elements are mapped by dom.init()
    // The setTimeout might still be useful if catalogIndex.init itself has async aspects
    // or relies on other parts of the DOM being fully processed.
    setTimeout(() => {
        if (elements && elements.main) {
            catalogIndex.init(elements.main);
        } else {
            console.warn(
                "elements.main not found after dom.init(), attempting to use document.querySelector('main') for catalogIndex.init"
            );
            catalogIndex.init(document.querySelector('main'));
        }
    }, 0);

    // Load catalog data (this will now emit 'productsLoaded' event)
    catalogData.load('./data/products.json'); // Removed the direct callback

    // Auth Login initialization
    authLogin.init();
};

init();
