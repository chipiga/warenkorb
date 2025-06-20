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
        elements.catalog = document.querySelector('#catalog');
        elements.search = document.querySelector('#search');
    },
    appendEventListeners() {
        // elements.search.addEventListener('change', render.catalog);
    }
}