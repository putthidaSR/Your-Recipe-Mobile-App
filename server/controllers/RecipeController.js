const mysql = require('../dbConfig.js');


exports.findOne = (req, res) => {

  mysql.query(`SELECT * FROM view_posted_recipes WHERE user_name = '${req.params.username}'`, function (error, results) {

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

exports.deleteOne = (req, res) => {

  mysql.query(`DELETE FROM Recipe WHERE id = '${req.params.recipeId}'`, function (error, results) {

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

exports.findOneDetailRecipe = (req, res) => {

  mysql.query(`SELECT * FROM RecipeDetails WHERE recipe_id = '${req.params.recipeId}'`, function (error, results) {

		if (error) {

      // Handle any errors found while communicating with the DB
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      })); 

    } else {

      var recipeDetailId = results[0].id;
      var timeNeeded = results[0].time_needed;
      var difficultyLevel = results[0].difficulty_level;
      console.log('RecipeDetail', recipeDetailId, timeNeeded, difficultyLevel);

      mysql.query(`SELECT country_name FROM recipeorigin WHERE recipeDetails_id = '${recipeDetailId}'`, function (error, results1) {

        if (error) {

          // Handle any errors found while communicating with the DB
          res.send(JSON.stringify({
            "status": 500,
            "error": error
          })); 

        } else {

          var countryName = results1[0].country_name;

          mysql.query(`SELECT name FROM FoodType WHERE recipeDetails_id = '${recipeDetailId}'`, function (error, results) {
            var foodType = results;

            mysql.query(`SELECT name FROM DietType WHERE recipeDetails_id = '${recipeDetailId}'`, function (error, results) {
              var dietType = results;
  
              mysql.query(`SELECT name FROM Ingredient WHERE recipeDetails_id = '${recipeDetailId}'`, function (error, results) {
                var ingredients = results;
                
                mysql.query(`SELECT step FROM Direction WHERE recipeDetails_id = '${recipeDetailId}'`, function (error, results) {
                  var cookingSteps = results;
                  
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
                      "response": countryName,
                      "timeNeeded": timeNeeded,
                      "difficultyLevel": difficultyLevel,
                      "countryName": countryName,
                      "foodType": foodType,
                      "dietType": dietType,
                      "ingredients": ingredients,
                      "cookingSteps": cookingSteps
                    }));
                  }

                });
              });
            });

          });

        }
	    });
    }
	});
}


exports.search = (req, res) => {

  // Validate request
  if (!req.body) {
    res.send(JSON.stringify({
      "status": 400, 
      "error": "Request body cannot be empty"
    }));
  }

  var sql = `SELECT Count(detail.id), Count(rep.id), rep.name AS recipeName, rep.id as recipeId, detail.id as recipeDetailId 
    FROM FoodType food, DietType diet, RecipeDetails detail, Recipe rep
    WHERE food.name = '${req.body.foodType}' 
      AND diet.name = '${req.body.dietType}' 
      AND detail.difficulty_level = '${req.body.difficultyLevel}'
      AND rep.id = detail.recipe_id
    GROUP BY detail.recipe_id, detail.id`;

  mysql.query(sql, function (error, results) {

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

