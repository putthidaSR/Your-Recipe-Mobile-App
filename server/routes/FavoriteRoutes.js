var express = require('express');
var router = express.Router();

const favoriteRecipe = require("../controllers/FavoriteRecipeController.js");

// Add favorite recipe to the specified user
router.post("/", favoriteRecipe.create);

// Retrieve all favorite recipes that belong to a specific user
router.get("/:username", favoriteRecipe.findAll);

module.exports = router;
