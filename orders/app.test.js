const request = require('supertest');
const app = require('./app');
const axios = require('axios');
const ordersService = require('./orders');

jest.mock('axios');
jest.mock('./orders');

describe('POST /orders', () => {
    it('crée une commande avec succès', async () => {
        const fakeProducts = [{ id: 1, name: 'Produit A' }, { id: 2, name: 'Produit B' }];
        axios.get
            .mockResolvedValueOnce({ data: fakeProducts[0] })
            .mockResolvedValueOnce({ data: fakeProducts[1] });

        const fakeOrder = { id: 123, items: fakeProducts };
        ordersService.create.mockReturnValue(fakeOrder);

        const response = await request(app)
            .post('/orders')
            .send({ productIds: [1, 2] });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(fakeOrder);
        expect(ordersService.create).toHaveBeenCalledWith(fakeProducts);
    });

    it('renvoie une erreur si axios échoue', async () => {
        axios.get.mockRejectedValue(new Error('API error'));

        const response = await request(app)
            .post('/orders')
            .send({ productIds: [1] });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Erreur lors de la création de commande');
    });
});

describe('GET /orders/:id', () => {
    it('retourne une commande existante', async () => {
        const fakeOrder = { id: 1, items: ['test'] };
        ordersService.getById.mockReturnValue(fakeOrder);

        const response = await request(app).get('/orders/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeOrder);
    });

    it('retourne 404 si la commande n’existe pas', async () => {
        ordersService.getById.mockReturnValue(undefined);

        const response = await request(app).get('/orders/999');

        expect(response.status).toBe(404);
        expect(response.text).toBe('Commande non trouvée');
    });
});
