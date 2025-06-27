'use strict';

// eslint-disable-next-line no-redeclare
const catalogRating = {
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

        const rating = catalogRating.getRatingValue(e.target);
        const parent = e.target.closest('[data-segment="rating"]');

        parent.querySelectorAll('svg[data-value]').forEach((s, index) => {
            s.classList.toggle('text-yellow-300', index < rating);
            s.classList.toggle('text-gray-300', index >= rating);
        });
    },
    handleClick(e) {
        e.preventDefault();

        const rating = catalogRating.getRatingValue(e.target);
        const productId = catalogIndex.getProductId(e.target);

        catalogData.saveRating(productId, rating); // Save the rating to the data store
        const product = catalogData.findById(productId);
        if (product) {
            const parent = e.target.closest('[data-segment="rating"]');
            parent.querySelector('div p').innerText = catalogRating.displayRating(product); // Update displayed rating
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    },
    getRatingValue(el) {
        return parseInt(el.getAttribute('data-value') || el.parentNode.getAttribute('data-value')); // Fallback to parent if event on path triggered
    },
    displayRating(product) {
        return `${product.ratingAvg.toFixed(2)} [${product.ratingCount}]`;
    },
};
