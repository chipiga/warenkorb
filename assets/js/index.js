'use strict';

const init = () => {
    dom.mapping();
    dom.appendEventListeners();
    catalogData.load('./data/products.json');
}

init();
