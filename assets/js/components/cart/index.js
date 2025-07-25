'use strict';

const cartIndex = {
    render(parent) {
        cartData.data.forEach(item => {
            const product = catalogData.findById(item.id);
            if (!product) return; // Produkt nicht gefunden, überspringen
            const el = utils.createDOM(`
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0" data-product-id="${product.id}">
                    <a href="#" class="shrink-0 md:order-1">
                        <img class="h-20 w-20" src="${product.image}" alt="${product.name}" />
                    </a>

                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                            <button type="button" id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="counter-input" data-input-counter
                                class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                placeholder="" value="${item.quantity}" required />
                            <button type="button" id="increment-button"
                                data-input-counter-increment="counter-input"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 dark:text-white">${utils.numberCurrency(product.price)}</p>
                        </div>
                    </div>

                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            ${product.name}
                        </a>
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            ${product.description}
                        </p>

                        <div class="flex items-center gap-4">
                            <button type="button" id="remove-button"
                                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                <svg class="me-1.5 h-5 w-5" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2"
                                        d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `, 'div', parent, 'rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6');

            el.querySelector('button#remove-button').addEventListener('click', this.handleRemove);
            el.querySelector('button[data-input-counter-increment]').addEventListener('click', this.handleQuantityChange);
            el.querySelector('button[data-input-counter-decrement]').addEventListener('click', this.handleQuantityChange);
        });
    },
    handleRemove(e) {
        e.preventDefault();
        const productId = cartIndex.getProductId(e.target);
        cartData.delete(productId);
        e.target.closest('[data-product-id]').parentNode.remove();
    },
    handleQuantityChange(e) {        
        e.preventDefault();
        const input = e.target.closest('div').querySelector('input');
        let value = parseInt(input.value);
        if (e.target.closest('button').id === 'increment-button') { // because of SVG icon
            value++;
        } else { // decrement
            if (value > 1) value--;
        }        
        input.value = value;
        const productId = cartIndex.getProductId(e.target);
        cartData.update(productId, value);
    },
    getProductId(el) {
        return parseInt(el.closest('[data-product-id]').getAttribute('data-product-id'));
    }
}