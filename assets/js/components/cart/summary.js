'use strict';

const cartSummary = (parent) => {
    const summary = {
        cost: 0,
        delivery: 0,
        tax: 0,
        total: 0
    };

    cartData.data.forEach(item => {
        const product = catalogData.data.find(product => product.id === item.id);
        if (!product) return; // Produkt nicht gefunden, überspringen
        summary.cost = summary.cost + product.price * item.quantity;
        summary.delivery = summary.delivery  + product.weight * item.quantity * 7; // 7 Euro pro kg
        summary.tax = summary.cost * 0.19; // 19% Steuern
        summary.total = summary.cost + summary.delivery + summary.tax;
    });
    summary.cost = summary.cost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    summary.delivery = summary.delivery.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    summary.tax = summary.tax.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    summary.total = summary.total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

    dom.create(`
        <div class="space-y-2">
            <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Cost</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${summary.cost}</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${summary.delivery}</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${summary.tax}</dd>
            </dl>
        </div>
        <dl
            class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
            <dd class="text-base font-bold text-gray-900 dark:text-white">${summary.total}</dd>
        </dl>
    `, 'div', parent);
}