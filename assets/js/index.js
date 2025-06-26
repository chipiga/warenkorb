'use strict';

const init = () => {
    dom.mapping();
    dom.appendEventListeners();
    catalogIndex.init(elements.main);
    catalogData.load('./data/products.json');
    authLogin.init();
}

init();
