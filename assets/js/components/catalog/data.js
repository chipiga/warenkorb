'use strict';

// eslint-disable-next-line no-redeclare, no-unused-vars
const catalogData = {
    data: [],
    load(url, onLoadCallback) { // Added onLoadCallback
        utils.loadJSON(
            url,
            function (payload) { // Use a regular function to maintain 'this' context if needed, or arrow if not.
                this._processLoadedData(payload);
                if (typeof onLoadCallback === 'function') {
                    onLoadCallback(payload);
                }
            }.bind(this) // Bind 'this' to ensure catalogData context
        );
    },
    _processLoadedData(payload) { // Renamed from save, and removed render call
        this.data = payload;
        // render.catalog(payload); // Removed: UI update is now responsibility of the caller via onLoadCallback
    },
    // The old save method's TODO was about a callback, which is now implemented in load.
    // If there's a need for a generic save method (e.g. to localStorage, not currently used for catalog),
    // it would be separate.

    search(query) {
        if (!query) {return this.data;}
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
            product.ratingAvg = (product.ratingAvg + rating) / 2; // Simple average for demo purposes
            product.ratingCount = (product.ratingCount || 0) + 1; // Increment
        } else {
            console.warn(`Product with ID ${productId} not found!`);
        }
    },
};
