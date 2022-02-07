// importation express 
const express = require("express");

const SaucesControllers = require("../controllers/SaucesControllers");

//importation du controller 
const likeSaucesControllers = require("../controllers/likeDislike");

// importation multer 
const multer = require('../middleware/multer.config');
// fonction Router() 
const router = express.Router();

const auth = require('../middleware/authentification');

router.get('/', auth, SaucesControllers.list);

router.get('/:id', auth, SaucesControllers.show);

router.post('/', auth, multer, SaucesControllers.create);

router.put('/:id', auth, multer, SaucesControllers.update);

router.delete('/:id', auth, SaucesControllers.remove);

router.post("/:id/like", auth, likeSaucesControllers.likeDislike);

module.exports = router;