'use strict';

// Import necessary core modules
import { dom, elements } from './dom.js';
import { render } from './render.js';

// Import component modules
import { catalogData } from './components/catalog/data.js';
import { catalogIndex } from './components/catalog/index.js';
import { authLogin } from './components/auth/login.js';
// Other components (utils, cartData, cartIndex, cartSummary, catalogRating)
// are imported by the modules that use them directly.

const init = () => {
    // Initialize DOM elements and event listeners
    dom.init();

    // Catalog Index initialization
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

    // Load catalog data
    catalogData.load('./data/products.json', function (loadedProducts) {
        if (elements && elements.catalog && elements.catalog.data) {
            render.catalog(elements.catalog.data, loadedProducts);
        } else {
            console.error("Cannot render catalog: elements.catalog.data not found.");
        }
    });

    // Auth Login initialization
    authLogin.init();
};

init();
