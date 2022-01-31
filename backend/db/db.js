// importation du package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// import de mongoose pour me connecter à la base de donnée mongoDB
const mongoose = require("mongoose");
// on met l'username, le password et le name en variable d'environnement (les bacticks pour pouvoir mettre les variables $)
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connexion à mongoDB réussi"))
.catch(() => console.log("connexion à mongoDB échoué"));

// exportation du module mongoose
module.exports = mongoose;