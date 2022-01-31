// importation de bcrypt pour hasher le password
const bcrypt = require ("bcrypt");

// importation de crypto-js pour chiffrer le mail 
const cryptoJs = require ("crypto-js");

//importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// importation pour l'utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();

// importation models de la base de donnée User.js 
const User = require("../models/User");

console.log(User);

// signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
console.log(req.body.email);
console.log(req.body.password);

// chiffrer l'email avant de l'envoyer dans la base de donnée
const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
console.log(emailCryptoJs);

// Hasher le mot de passe avant de l'envoyer dans la DB
bcrypt.hash(req.body.password, 10) //salt = 10 // combien de fois sera exécuté l'algorithme de hashage
.then((hash) => {
    // ce qui va être enregistré dans mongoDB
    const user = new User({
        email : emailCryptoJs,
        password : hash
     });
     console.log(user);

     // envoyer le user dans la base de donnée MongoDB
    user.save()
    .then(() => res.status(201).json({ message : "Utilisateur crée"}))
    .catch((error) => res.status(400).json({ error }).send());
})

.catch((error) => res.status(500).json({error}));

};

// login pour s'authentifier 
exports.login = (req, res, next) => {
 // le contenu de la requête
 console.log("C'est ici login")
 console.log(req.body.email);
 console.log(req.body.password);

// chiffrer email de la requête
const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
console.log(emailCryptoJs);

// chercher dans la base de donnée si l'utilisateur est bien présent 
User.findOne({email: emailCryptoJs })

// si l'email de l'utilisateur n'est pas présent, il n'existe pas
.then((user) => {
  if(!user) {
      return res.status(400).json({error: "Utilisateur inexistant"})
  }
   // contrôler la validité du password envoyer par le front
   bcrypt.compare(req.body.password, user.password)
      .then((controlPassword) => {
      console.log(controlPassword);

      // si le mot de passe est faux
      //point d'exclamation pour inverser la fonction 
      if(!controlPassword){
        return res.status(401).json({ error: "le mot de passe est incorrect" })
      }

      // le mot de passe est correct
      // envoie dans la response du serveur du userId et du token d'authentification
      res.status(200).json({
          // encodage du userId pour la création de nouvel objet (objet et userId seront liés)
          userId : user._id, 
          token: jwt.sign(
              //3 arguments
              {userId: user._id},
              `${process.env.JWT_KEY_TOKEN}`,
              {expiresIn: "2h"}
          )
      })
    })
    .catch((error) => res.status(500).json({ error }))
})
.catch((error) => res.status(500).json({error}));

};

