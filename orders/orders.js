let orders = [];
let nextId = 1;

function create(products) {
    const order = {
        id: nextId++,
        products,
        total: products.reduce((sum, p) => sum + p.price, 0)
    };
    orders.push(order);
    return order;
}

function getById(id) {
    return orders.find(o => o.id === id);
}

module.exports = { create, getById };