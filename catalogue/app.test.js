const request = require('supertest');
const app = require('./app');
const productsService = require('./catalogue');

jest.mock('./catalogue');

describe('GET /products', () => {
    it('renvoie tous les produits', async () => {
        const fakeProducts = [
            { id: 1, name: 'Produit A' },
            { id: 2, name: 'Produit B' }
        ];
        productsService.getAll.mockReturnValue(fakeProducts);

        const res = await request(app).get('/products');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(fakeProducts);
    });
});

describe('GET /products/:id', () => {
    it('renvoie un produit existant', async () => {
        const fakeProduct = { id: 1, name: 'Produit A' };
        productsService.getById.mockReturnValue(fakeProduct);

        const res = await request(app).get('/products/1');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(fakeProduct);
    });

    it("renvoie 404 si le produit n'existe pas", async () => {
        productsService.getById.mockReturnValue(undefined);

        const res = await request(app).get('/products/999');

        expect(res.status).toBe(404);
        expect(res.text).toBe('Produit non trouvé');
    });
});

describe('POST /products', () => {
    it('ajoute un nouveau produit', async () => {
        const newProduct = { name: 'Produit C' };
        const addedProduct = { id: 3, ...newProduct };
        productsService.add.mockReturnValue(addedProduct);

        const res = await request(app).post('/products').send(newProduct);

        expect(res.status).toBe(201);
        expect(res.body).toEqual(addedProduct);
    });
});
