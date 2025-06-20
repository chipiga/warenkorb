'use strict';

const init = () => {
    dom.mapping();
    dom.appendEventListeners();
    ajax.loadJSON('./data/products.json', render.catalog);
}

init();
