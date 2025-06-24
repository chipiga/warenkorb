'use strict';

const catalogData = {
    data: [],
    search(query) {        
        if (!query) return this.data;
        query = query.toLowerCase();
        return this.data.filter(item => {
            return item.name.toLowerCase().includes(query) ||
                   item.description.toLowerCase().includes(query);
        });
    },
    load(url) {
        utils.loadJSON(url, this.save.bind(this));
    },
    save(payload) {
        this.data = payload;
        render.catalog(payload); // TODO callback?
    }
};