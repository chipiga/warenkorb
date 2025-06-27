'use strict';

// Assuming catalogIndex and catalogData will be imported by the module that uses catalogRating (i.e., catalog/index.js)
// and will pass necessary data or call methods on an instantiated/imported catalogRating object.
// For now, catalogRating might still refer to global catalogIndex and catalogData if its consumer does not inject them.
// This will be resolved when catalog/index.js is modularized.

export const catalogRating = {
    stars() {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<svg class="w-4 h-4 ms-1 cursor-pointer text-gray-300" data-value="${i}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>`;
        }
        return stars;
    },
    handleMouseOver(e) {
        e.preventDefault();

        const rating = this.getRatingValue(e.target); // Changed to this.getRatingValue
        const parent = e.target.closest('[data-segment="rating"]');

        parent.querySelectorAll('svg[data-value]').forEach((s, index) => {
            s.classList.toggle('text-yellow-300', index < rating);
            s.classList.toggle('text-gray-300', index >= rating);
        });
    },
    // handleClick will need catalogIndex and catalogData passed or imported if they become non-global
    handleClick(e, _catalogIndex, _catalogData) { // Placeholder for future dependency injection
        e.preventDefault();
        // Use passed-in dependencies or fall back to globals for now
        const currentCatalogIndex = _catalogIndex || window.catalogIndex;
        const currentCatalogData = _catalogData || window.catalogData;


        const rating = this.getRatingValue(e.target); // Changed to this.getRatingValue
        const productId = currentCatalogIndex.getProductId(e.target);

        currentCatalogData.saveRating(productId, rating);
        const product = currentCatalogData.findById(productId);
        if (product) {
            const parent = e.target.closest('[data-segment="rating"]');
            parent.querySelector('div p').innerText = this.displayRating(product); // Changed to this.displayRating
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    },
    getRatingValue(el) {
        // Ensure 'el' is the SVG element or its child path, not a higher parent
        let targetEl = el.closest('svg[data-value]');
        return parseInt(targetEl.getAttribute('data-value'));
    },
    displayRating(product) {
        if (product && typeof product.ratingAvg === 'number' && typeof product.ratingCount === 'number') {
            return `${product.ratingAvg.toFixed(2)} [${product.ratingCount}]`;
        }
        // Fallback for products without rating or if rating is not yet calculated
        return `0.00 [0]`;
    },
};
