var express = require('express');
var router = express.Router();

const recipes = require("../controllers/RecipeController.js");

// Create (post) a new recipe
router.post("/", recipes.create);

// Delete a specific recipe that belongs to the specific user (ie: user who is currently logged in to the app)
router.delete("/:recipeId", recipes.deleteOne);

// Update a name of the specific recipe that belongs to the specific user (ie: user who is currently logged in to the app)
router.put("/:newRecipeName/:recipeId", recipes.updateOne);

// Retrieve any recipes that belong to a specific user
router.get("/:username", recipes.findOne);

// Retrieve all details of one specific recipe
router.get("/details/:recipeId", recipes.findOneDetailRecipe);

// Retrieve all recipes based on search type
router.post("/search", recipes.search);

module.exports = router;
