var express = require('express');
var router = express.Router();

const recipes = require("../controllers/RecipeController.js");

// Create (post) a new recipe
router.post("/add");

// Delete a specific recipe that belongs to the specific user (ie: user who is currently logged in to the app)
router.delete("/:username/:recipeId");

// Update a specific recipe that belongs to the specific user (ie: user who is currently logged in to the app)
router.put("/:username/:recipeId");

// Retrieve any recipes that belong to a specific user
router.get("/:username");

// Retrieve all recipes from any users
router.get("/");

// Retrieve all recipes based on search type
router.get("/search");

module.exports = router;
