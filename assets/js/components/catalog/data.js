'use strict';

// Import specific functions from utils.js
import { loadJSON } from './utils.js'; // Assuming utils.js is in the same directory

export const catalogData = { // Added export
    data: [],
    load(url, onLoadCallback) {
        loadJSON( // Use imported loadJSON directly
            url,
            function (payload) {
                this._processLoadedData(payload);
                if (typeof onLoadCallback === 'function') {
                    onLoadCallback(payload);
                }
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
            product.ratingAvg = (product.ratingAvg + rating) / 2; // Simple average for demo
            product.ratingCount = (product.ratingCount || 0) + 1;
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    },
};
