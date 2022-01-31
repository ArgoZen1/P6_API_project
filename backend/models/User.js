// importation de mongoose 
const mongoose = require("mongoose");

// importation mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// le modèle de base de donnée pour le signup (pour enregister un nouvel utilisateur)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// sécurité conseillée pour ne pas enregistrer 2 fois la même adresse email dans la base de donnée
userSchema.plugin(uniqueValidator);

// exportation du module 
module.exports = mongoose.model("user", userSchema);