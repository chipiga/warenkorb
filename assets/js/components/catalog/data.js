'use strict';

import { loadJSON } from './utils.js';
import eventEmitter from '../../eventEmitter.js'; // Adjusted path

export const catalogData = {
    data: [],
    load(url) { // Removed onLoadCallback parameter
        loadJSON(
            url,
            function (payload) {
                this._processLoadedData(payload);
                // Emit event instead of calling callback
                eventEmitter.emit('productsLoaded', this.data);
            }.bind(this)
        );
    },
    _processLoadedData(payload) {
        this.data = payload;
    },
    search(query) {
        if (!query) {
            return this.data;
        }
        query = query.toLowerCase();
        return this.data.filter((item) => {
            return (
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        });
    },
    findById(productId) {
        return this.data.find((item) => item.id === productId);
    },
    saveRating(productId, rating) {
        const product = this.findById(productId);
        if (product) {
            product.ratingAvg = (product.ratingAvg + rating) / 2;
            product.ratingCount = (product.ratingCount || 0) + 1;
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    },
};
