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
│   ├── index.js
│   ├── catalogue.js
│   ├── dockerfile
│   └── package.json
│
├── orders/
│   ├── index.js
│   ├── orders.js
│   ├── dockefile
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md


# Pour le lancer vous devez cloner le projet, ouvrir visual studio et ouvrir un nouveau terminal, une fois sur le terminal il faudra entrer cette commande:
docker compose up --build

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

# Pour arrêter le projet : 
docker compose down

Par BOUZAR Lyza & VIJEYARUBAN Sharan