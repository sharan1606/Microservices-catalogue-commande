const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsService = require('.');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/products', (req, res) => {
    res.json(productsService.getAll());
});

app.get('/products/:id', (req, res) => {
    const product = productsService.getById(parseInt(req.params.id));
    if (product) res.json(product);
    else res.status(404).send('Produit non trouvé');
});

app.post('/products', (req, res) => {
    const product = productsService.add(req.body);
    res.status(201).json(product);
});

app.listen(8081, () => console.log('Catalogue service running on port 8081'));