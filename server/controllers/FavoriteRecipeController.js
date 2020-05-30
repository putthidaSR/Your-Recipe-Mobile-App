const mysql = require('../dbConfig.js');

/**
 * Retrieve all favorite recipes that belong to a specific user
 */
exports.findAll = (req, res) => {

  mysql.query(`SELECT * FROM FavoriteRecipe WHERE user_name = '${req.params.username}'
    ORDER BY id DESC`, function (error, results) {

		if (error) {

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