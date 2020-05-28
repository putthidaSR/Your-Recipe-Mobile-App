var express = require('express');
var router = express.Router();

const users = require("../controllers/UserController.js");

// Create a new user
router.post("/", users.create);

// Retrieve a single user with the specified username and password
router.get("/:username/:password", users.findOne);

// Retrieve all users
router.get("/", users.findAll);

module.exports = router;
