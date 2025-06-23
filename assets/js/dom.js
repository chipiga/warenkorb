'use strict';

const dom = {
    create(content = false, type = 'div', parent = false, className = false) {
        const el = document.createElement(type);
        if (content) el.innerHTML = content;
        if (className) el.className = className;
        if (parent) parent.append(el);

        return el;
    },
    mapping(){
        elements.catalogLayout = document.querySelector('#catalog-layout');
        elements.catalogData = document.querySelector('#catalog-data');
        elements.catalogSearch = document.querySelector('#catalog-search');
        elements.cartLayout = document.querySelector('#cart-layout');
        elements.cartData = document.querySelector('#cart-data');
        elements.cartOpen = document.querySelector('#cart-open');
        elements.cartClose = document.querySelector('#cart-close');
        elements.cartSummary = document.querySelector('#cart-summary');
        elements.loginLayout = document.querySelector('#login-layout');
    },
    appendEventListeners() {
        elements.catalogSearch.addEventListener('input', (e) => {
            const filteredData = catalogData.search(e.target.value);
            render.catalog(filteredData);
        });
        elements.cartOpen.addEventListener('click', (e) => {
            e.preventDefault();
            elements.catalogLayout.classList.toggle('hidden');
            elements.cartLayout.classList.toggle('hidden');
            render.cart();
            render.summary();
        });
        elements.cartClose.addEventListener('click', (e) => {
            e.preventDefault();
            elements.catalogLayout.classList.toggle('hidden');
            elements.cartLayout.classList.toggle('hidden');
        });
        document.querySelectorAll('[data-login="true"]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                elements.catalogLayout.classList.add('hidden');
                elements.cartLayout.classList.add('hidden');
                elements.loginLayout.classList.remove('hidden');
            });
        });
        document.querySelectorAll('[data-alert]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                alert(e.target.dataset.alert);
            });
        });
    }
}