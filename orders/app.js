const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const ordersService = require('./orders');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CATALOGUE_URL = 'http://catalogue:8081/products';

app.post('/orders', async (req, res) => {
    try {
        const ids = req.body.productIds;
        const productPromises = ids.map(id => axios.get(`${CATALOGUE_URL}/${id}`));
        const products = (await Promise.all(productPromises)).map(resp => resp.data);
        const order = ordersService.create(products);
        res.status(201).json(order);
    } catch (error) {
        console.error('Erreur axios :', error.message);
        res.status(500).send('Erreur lors de la création de commande');
    }
});

app.get('/orders/:id', (req, res) => {
    const order = ordersService.getById(parseInt(req.params.id));
    if (order) res.json(order);
    else res.status(404).send('Commande non trouvée');
});

module.exports = app;
