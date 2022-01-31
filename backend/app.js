// importation de express
const express = require("express");
// console.log(express);

// importation de morgan (logger http);
const morgan = require ("morgan");

// importation connexion base de donnée mongoDB
const mongoose =require ("./db/db");

//importation des routes 
const userRoutes = require("./routes/user");
// const getSauces = require("./routes/getSauces")

// importation de body-parser 
const bodyParser = require("body-parser");

//importation du model Sauces.js 
const Sauces= require('./models/Sauces');

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

// transformer le corps (body) en JSON
app.use(bodyParser.json());

// route d'autentification 
app.use("/api/auth", userRoutes);

// création de la route array of sauces 
// app.use('/api/sauces')
    

// exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;