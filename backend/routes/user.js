// importation express 
const express = require("express");

// importation du middleware/password
const password = require("../middleware/password");

// importation du controllers/user.js
const userController = require("../controllers/userControllers");

// fonction Router() 
const router = express.Router();

const rateLimit = require("../middleware/rateLimit")

// la route (endpoint) signup
router.post("/signup", password, userController.signup);

// la route (endpoint) login
router.post("/login", rateLimit.apiLimiter, userController.login);

// exportation du module 
module.exports = router;

