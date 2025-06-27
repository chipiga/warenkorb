'use strict';

const init = () => {
    // Assuming dom.js will be refactored to have an init() function
    // that calls mapElements() and attachEventListeners() internally.
    if (typeof dom !== 'undefined' && dom.init) {
        dom.init();
    } else if (typeof dom !== 'undefined') {
        // Fallback to old method calls if dom.init isn't defined yet,
        // though the goal is to use dom.init()
        if (dom.mapping) {dom.mapping();} // Kept for compatibility if dom.js isn't updated
        if (dom.appendEventListeners) {dom.appendEventListeners();} // Kept for compatibility
    }

    // Initialize catalog, ensuring elements.main is available.
    // elements.main should be populated by dom.mapElements() (called within dom.init() or dom.mapping()).
    // A check for elements might be good practice here.
    // Adding a slight delay or check for elements.main to ensure dom mapping has occurred.
    setTimeout(() => {
        if (typeof catalogIndex !== 'undefined' && catalogIndex.init) {
            // Ensure elements object and elements.main are available
            if (typeof elements !== 'undefined' && elements.main) {
                catalogIndex.init(elements.main);
            } else {
                // Fallback if elements.main is not set by the time this runs
                // This could happen if dom.init() or dom.mapping() hasn't completed
                // or if elements object is not globally accessible as expected.
                console.warn(
                    "elements.main not found, attempting to use document.querySelector('main') for catalogIndex.init"
                );
                catalogIndex.init(document.querySelector('main'));
            }
        }
    }, 0); // setTimeout with 0ms defers execution slightly, allowing DOM scripts to complete.

    if (typeof catalogData !== 'undefined' && catalogData.load) {
        catalogData.load('./data/products.json');
    }

    if (typeof authLogin !== 'undefined' && authLogin.init) {
        authLogin.init();
    }
};

init();
