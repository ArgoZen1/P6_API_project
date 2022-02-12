// importation de express
const express = require("express");

// importation de morgan (logger http);
const morgan = require("morgan");

//importation de helmet
const helmet = require("helmet");

// importation connexion base de donnée mongoDB
const mongoose = require("./db/db");

// importation de path
const path = require('path');

//importation des routes 
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/saucesRoutes");

//importation du model Sauces.js 
const Sauces = require('./models/Sauces');

// pour créer une application express
const app = express();

// logger les requests et les responses
app.use(morgan("dev"));

// debug mongoose
(mongoose.set('debug', true));

// gérer les problèmes de CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "Get, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// transformer le corps (body) en JSON
app.use(express.json());

// route de l'image
app.use('/images', express.static(path.join(__dirname, 'images')));

// route d'autentification 
app.use("/api/auth", userRoutes);

// création de la route pour la fiche sauce 
app.use("/api/sauces", saucesRoutes);

// exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;