'use strict';

// eslint-disable-next-line no-redeclare
const catalogIndex = {
    init(parent) {
        // utils.createDOM(`
        //     <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        //         <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
        //             <div>
        //                 <div class="relative">
        //                     <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        //                         <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
        //                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        //                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
        //                                 stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        //                         </svg>
        //                     </div>
        //                     <input type="search" id="catalog-search"
        //                         class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                         placeholder="Search..." required />
        //                 </div>
        //             </div>
        //             <div class="flex items-center space-x-4 cursor-pointer" id="cart-open">
        //                 <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
        //                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        //                         d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
        //                 </svg>
        //             </div>
        //         </div>
        //         <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4" id="catalog-data">
        //             No data
        //         </div>
        //     </div>
        // `, 'section', parent, 'bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12');
        document.getElementById('catalog-search').addEventListener('input', (e) => {
            const filteredData = catalogData.search(e.target.value);
            // catalogIndex.renderProducts(document.getElementById('catalog-data'), filteredData);
            render.catalog(filteredData);
        });
    },
    renderProducts(parent, products) {
        for (const product of products) {
            const el = utils.createDOM(
                `
                <div data-product-id="${product.id}" class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800>">
                    <div class="h-56 w-full">
                        <a href="#"  class="h-56 w-full">
                            <img class="mx-auto h-full" src="${product.image}" alt="${product.name}" />
                        </a>
                    </div>
                    <div class="pt-6">
                        <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">${product.name}</a>

                        <div class="mt-2">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">${product.description}</p>
                        </div>

                        <div class="mt-4 flex items-center justify-between" data-segment="rating">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">${catalogRating.displayRating(product)}</p>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                ${catalogRating.stars()}
                            </div>
                        </div>

                        <div class="mt-4 flex items-center justify-between gap-4">
                            <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${utils.numberCurrency(product.price)}</p>

                            <button type="button" class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `,
                'div',
                parent
            );

            el.querySelector('button').addEventListener('click', this.handleAddToCart);
            el.querySelectorAll('[data-segment="rating"] svg[data-value]').forEach((star) => {
                star.addEventListener('mouseover', catalogRating.handleMouseOver);
                star.addEventListener('click', catalogRating.handleClick);
            });
        }
    },
    handleAddToCart(e) {
        e.preventDefault();
        const productId = catalogIndex.getProductId(e.target);
        cartData.add(productId);
        alert(`Product with ID ${productId} added to cart!`);
    },
    getProductId(el) {
        return parseInt(el.closest('[data-product-id]').getAttribute('data-product-id'));
    },
};
