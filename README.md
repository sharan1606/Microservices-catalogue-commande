# Microservices-catalogue-commande
Conception de deux microservices – catalogue & commande

Ce projet à pour but de comprendre les micro services, il contient deux services: catalogue et commande comme sur un site d'e-commerce.
Catalogue servira a fournir les produits disponible et commande servira à créer des commandes en fonction du catalogue
C'est un mini projet donc il n'y a pas de base de donnée tout est stocké en local.

# Pour bien réaliser le projet vous avez besoin d'installer :
- Visual studio code -> Pour coder et utiliser son terminal intégrer
- Docker -> Pour les container
- Postman -> Pour tester le bon fonctionnement de notre projet

# Structure :
microservices-catalogue-commande/
│
├── catalogue/
│   ├── app.js
│   ├── app.test.js
│   ├── catalogue.js
│   ├── dockerfile
│   ├── server.js
│   └── package.json
│
├── orders/
│   ├── app.js
│   ├── orders.js
│   ├── server.js
│   ├── dockefile
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md


# Pour le lancer vous devez cloner le projet, ouvrir visual studio et ouvrir un nouveau terminal, une fois sur le terminal il faudra entrer des commande:

- npm install express body-parser cors axios (pour installer express ,body-parser,cors et axios)
- npm init -y (pour créer le fichier package.json)
- docker compose up --build (pour construire et lancer le projet)

Une fois construit, vos deux services seront lancé sur deux ports :
Catalogue -> 8081
Commande -> 8082

# Pour être sur que tout fonctionne nous allons tester sur postman :

# Pour tester le micro service catalogue:
1/ Obtenir tous les produits
GET http://localhost:8081/products

2/ Obtenir un produit par ID
GET http://localhost:8081/products/1

3/ Ajouter un produit
POST http://localhost:8081/products
body->raw: {
  "id": 3,
  "name": "Claquette",
  "price": 9.99
}

# Pour tester le micro service commande : 
1/ Créer une commande
POST http://localhost:8082/orders
body->raw: {
  "productIds": [1, 2]
}

2/ Obtenir une commande par ID
GET http://localhost:8082/orders/1

3/ Tester erreur -> produit inexistant
POST http://localhost:8082/orders
body-> raw: {
  "productIds": [99]
}
Résultat : Error 500

# Pour les tests unitaires: 
1/ Ouvrir le terminal à la racine pour installer Jest et supertest :
npm install --save-dev jest supertest

2/ Vérifier que sur catalogue/package.json & orders/package.json vous avez cette ligne:
"scripts": {
    "test": "jest"
  },

3/ Dans le terminal mettez vous dans le dossier catalogue ou orders et entrez cette commande :
"npm test" ou "npm run test" en fonction de votre systeme.

4/ Vous devriez voir :
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total

# Pour arrêter le projet : 
docker compose down

Par BOUZAR Lyza & VIJEYARUBAN Sharan