const mysql = require('../dbConfig.js');

// Create and Save a new user
exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.send(JSON.stringify({
      "status": 400, 
      "error": "Request body cannot be empty"
    }));
  }

  // Check if username already exists in the database
  console.log('Check for duplicate username');

  mysql.query(`SELECT * FROM Users WHERE user_name = "${req.body.username}"`, function (error, results) {
    
    if (error) {

      // Handle any errors while communicating with the DB
      res.send(JSON.stringify({
        "status": 500, 
        "error": error
      })); 

    } else if (results.length > 0) {

      // User with the specified username already exists in the table
      res.send(JSON.stringify({
        "status": 404,
        "response": "User with the username already exists in the table.",
      }));
    } else {

      console.log('Attempt to insert user');

      // Attempt to insert user into the User table
      mysql.query(`INSERT INTO Users (user_name, password, email) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.email}')`, function (error, results) {
        
        if (error) {
          console.log("Error inserting", error);
          res.send(JSON.stringify({"status": 500, "error": error}));

        } else {
          res.send(JSON.stringify({
            "status": 200,
            "message": "User is successfully added."
          }));
        }

      });
    }
  });
};

/**
 * Find a single user with a username and password: http://localhost:9000/users/S1/C1
 */
exports.findOne = (req, res) => {

  mysql.query(`SELECT * FROM Users WHERE user_name = "${req.params.username}" AND password LIKE BINARY "${req.params.password}"`, function (error, results) {
    
    if (error) {

      // Handle any errors while communicating with the DB
      res.send(JSON.stringify({
        "status": 500, 
        "error": error
      })); 

    } else if (results.length < 1) {

      // No user is found
      res.send(JSON.stringify({
        "status": 404,
        "response": "No user with the specified username and password is found in the database.",
      }));

    } else {

      // User found. Authentication is successful.
      res.send(JSON.stringify({
        "status": 200,
        "response": results,
        "message": "User found. Logging to the app..."
      }));
    }
  });
};

/**
 * Find all users in the DB.
 */
exports.findAll = (req, res) => {

  mysql.query('SELECT * FROM Users', function (error, results) {

		if (error){

      // Handle any errors found while communicating with the DB
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      })); 

    } else {

      // Request is sucessful.
      res.send(JSON.stringify({
        "status": 200, 
        "response": results
      }));
    }
	});
}
