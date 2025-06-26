'use strict';

const cartSummary = {
    render(parent) {
        const summary = {
            cost: 0,
            delivery: 0,
            tax: 0,
            total: 0
        }

        cartData.data.forEach(item => {
            const product = catalogData.findById(item.id);
            if (!product) return; // Produkt nicht gefunden, überspringen
            summary.cost = summary.cost + product.price * item.quantity;
            summary.delivery = summary.delivery  + product.weight * item.quantity * 7; // 7 Euro pro kg
            summary.tax = summary.cost * 0.19; // 19% Steuern
            summary.total = summary.cost + summary.delivery + summary.tax;
        });

        utils.createDOM(`
            <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Cost</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${utils.numberCurrency(summary.cost)}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${utils.numberCurrency(summary.delivery)}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${utils.numberCurrency(summary.tax)}</dd>
                </dl>
            </div>
            <dl
                class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">${utils.numberCurrency(summary.total)}</dd>
            </dl>
        `, 'div', parent);
    }
}