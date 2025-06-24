'use strict';

const catalogIndex = (parent, products) => {
    for (const product of products) {
        const el = utils.createDOM(`
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

                <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">${product.ratingAvg}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">${product.ratingCount} reviews</a>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between gap-4">
                    <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${utils.numberCurrency(product.price)}</p>

                    <button type="button" class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart
                    </button>
                </div>
            </div>
        `, 'div', parent, 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800');

        el.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            cartData.add(product.id);
            alert(`Product "${product.name}" added to cart!`);
        });
    }
}