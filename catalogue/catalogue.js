let products = [
    { id: 1, name: 'Chaussures', price: 59.99 },
    { id: 2, name: 'T-shirt', price: 19.99 }
];

let nextId = 3;

function getAll() {
    return products;
}

function getById(id) {
    return products.find(p => p.id === id);
}

function add(product) {
    product.id = nextId++;
    products.push(product);
    return product;
}

module.exports = { getAll, getById, add };