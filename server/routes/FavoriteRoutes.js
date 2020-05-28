var express = require('express');
var router = express.Router();

const favoriteRecipe = require("../controllers/FavoriteRecipeController.js");

// Add a new favorite recipe
router.post("/");

// Retrieve all favorite recipes that belong to a specific user
router.get("/:username");

// Remove a specific favorite recipe that belongs to a specific user
router.delete("/:username/:favoriteRecipeId");

module.exports = router;
