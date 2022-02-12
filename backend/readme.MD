# backend 
Mettre les informations pour les variables d'environnement (base de donnée MongoDB Atlas)

pour lancer le serveur : `$ nodemon server`
pour lancer le front : `$ npm run start`

# Routes
## La route POST pour créer un compte 
http://localhost:3000/api/auth/signup

## La route POST pour se logger 
http://localhost:3000/api/auth/login

## La route GET pour le tableau de toutes les sauces
http://localhost:3000/api/sauces

## La route GET pour renvoyer la sauce avec l'id fourni 
http://localhost:3000/api/sauces/:id

## La route POST pour l'image et la sauce
http://localhost:3000/api/sauces

## La route PUT pour la mise à jour de la sauce 
http://localhost:3000/api/sauces/:id

## La route DELETE pour la supression de la sauce 
http://localhost:3000/api/sauces/:id

## La route post pour les likes et dislikes
http://localhost:3000/api/sauces/:id/like



