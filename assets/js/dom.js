'use strict';

const elements = {
    
}

const dom = {
    mapping(){
        elements.main = document.querySelector('main');
        elements.catalogLayout = document.querySelector('#catalog-layout');
        elements.catalogData = document.querySelector('#catalog-data');
        elements.cartLayout = document.querySelector('#cart-layout');
        elements.cartData = document.querySelector('#cart-data');
        elements.cartOpen = document.querySelector('#cart-open');
        elements.cartClose = document.querySelector('#cart-close');
        elements.cartSummary = document.querySelector('#cart-summary');
        elements.loginLayout = document.querySelector('#login-layout');
    },
    appendEventListeners() {
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