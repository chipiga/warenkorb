'use strict';

// TODO: redo?
const catalogIndex = (parent, products) => {
    for (const product of products) {
        const wrapper = document.createElement('div');
        wrapper.className = 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800';

        let container = document.createElement('div');
        container.className = 'h-56 w-full';
        wrapper.append(container);

        let imgTag = document.createElement('img');
        imgTag.className = 'mx-auto h-full';
        imgTag.src = product.image;
        imgTag.alt = product.name;
        container.append(imgTag);

        container = document.createElement('div');
        container.className = 'pt-6';
        wrapper.append(container);

        let aTag = document.createElement('a');
        aTag.className = 'text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white';
        aTag.href = '#';
        aTag.innerHTML = product.name;
        container.append(aTag);

        let divTag = document.createElement('div');
        divTag.className = 'mt-2';
        container.append(divTag);

        let pTag = document.createElement('p');
        pTag.className = 'text-sm font-medium text-gray-500 dark:text-gray-400';
        pTag.innerHTML = product.description;
        divTag.append(pTag);

        divTag = document.createElement('div');
        divTag.className = 'mt-4 flex items-center justify-between gap-4';
        container.append(divTag);

        pTag = document.createElement('p');
        pTag.className = 'text-2xl font-extrabold leading-tight text-gray-900 dark:text-white';
        pTag.innerHTML = product.price.toLocaleString('de-DE', { // TODO helper function
            style: 'currency',
            currency: 'EUR'
        });
        divTag.append(pTag);

        let button = document.createElement('button');
        button.className = 'inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer';
        button.innerHTML = 'Add to cart';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartData.add(product.id);
            alert(`Product "${product.name}" added to cart!`);
        });
        divTag.append(button);

        parent.append(wrapper);
    }
}