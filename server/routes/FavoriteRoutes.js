var express = require('express');
var router = express.Router();

const favoriteRecipe = require("../controllers/FavoriteRecipeController.js");

// Retrieve all favorite recipes that belong to a specific user
router.get("/:username", favoriteRecipe.findAll);

module.exports = router;
