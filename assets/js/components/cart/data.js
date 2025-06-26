'use strict';

const cartData = {
    data: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], // {id, quantity}
    add(id) {
        let item = this.data.find(item => item.id === id);
        if (item) { // Produkt ist bereits im Warenkorb
            item.quantity++;
        } else {
            item = { id: id, quantity: 1 };
            this.data.push(item);
        }
        this.save();
    },
    delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.save();
    },
    update(id, quantity) {
        const product = this.data.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            this.save();
        }
    },
    save() {
        localStorage.setItem('cart', JSON.stringify(this.data));
        render.summary();
    }
};