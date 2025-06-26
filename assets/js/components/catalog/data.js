'use strict';

const catalogData = {
    data: [],
    load(url) {
        utils.loadJSON(url, this.save.bind(this));
    },
    save(payload) {
        this.data = payload;
        render.catalog(payload); // TODO callback?
    },
    search(query) {
        if (!query) return this.data;
        query = query.toLowerCase();
        return this.data.filter(item => {
            return item.name.toLowerCase().includes(query) ||
                   item.description.toLowerCase().includes(query);
        });
    },
    findById(productId) {
        return this.data.find(item => item.id === productId);
    },
    saveRating(productId, rating) {
        const product = this.findById(productId);
        if (product) {
            product.ratingAvg = (product.ratingAvg + rating) / 2; // Simple average for demo purposes
            product.ratingCount = (product.ratingCount || 0) + 1; // Increment
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    }
};