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

exports.updateOne = (req, res) => {

  mysql.query(`UPDATE Recipe SET name = '${req.params.newRecipeName}' WHERE id = '${req.params.recipeId}'`, function (error, results) {

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



exports.create = (req, res) => {
  
  var hasError = false;

  var insertRecipeSql = `INSERT INTO Recipe(name, user_name) VALUES ('${req.body.recipeName}', '${req.body.username}')`;
  mysql.query(insertRecipeSql, function (error, results) {


		if (error) {
      hasError = true;
    } else {
      
      /*
       * Select id of the newly added recipe above
       */
      var selectIdSql = `SELECT id FROM Recipe WHERE name = '${req.body.recipeName}' AND user_name = '${req.body.username}'
        ORDER BY id DESC`;
      
        mysql.query(selectIdSql, function (error, results) {

          if (!error) {
            
            var recipeId = results[0].id;
            var insertRecipeDetailsSql = `INSERT INTO RecipeDetails(recipe_id, time_needed, difficulty_level)
              VALUES ('${recipeId}', '${req.body.timeNeeded}', '${req.body.difficultyLevel}')`;

            console.log('Attempt to insert a new recipeDetails with recipeId = ' + recipeId);
            mysql.query(insertRecipeDetailsSql, function (error, results) {

              if (!error) {

                console.log('Attempt to select recipeDetailsId');
                mysql.query(`SELECT id FROM RecipeDetails ORDER BY id DESC`, function (error, results) {

                  if (!error) {

                    var recipeDetailId = JSON.stringify(results[0].id);
                    console.log('Attempt to insert recipeOrigin', recipeDetailId)

                    mysql.query(`INSERT INTO RecipeOrigin(country_name, recipeDetails_id) VALUES ('${req.body.origin}', '${recipeDetailId}')`, function (error, results) {

                      if (!error) {

                        req.body.dietType.forEach((element) => {
                          console.log('Insert dietType value: ', element);
                          mysql.query( `INSERT INTO DietType(recipeDetails_id, name) VALUES ('${recipeDetailId}', '${element}')`, function (error, results) {

                            if (error) {
                              console.log("Error inserting diet type", element, error);
                              hasError = true;
                            }
                          });

                        })
            
                        req.body.foodType.forEach((element) => {
                          console.log('Insert FoodType value: ', element);
                          mysql.query( `INSERT INTO FoodType(recipeDetails_id, name) VALUES ('${recipeDetailId}', '${element}')`, function (error, results) {

                            if (error) {
                              console.log("Error inserting food type", element, error);
                              hasError = true;
                            }
                          });
                        })
            
                        req.body.ingredientList.forEach((element) => {
                          console.log('Insert ingredient value: ', element);
                          mysql.query( `INSERT INTO Ingredient(name, recipeDetails_id) VALUES ('${element}','${recipeDetailId}')`, function (error, results) {

                            if (error) {
                              console.log("Error inserting ingredient", element, error);
                              hasError = true;
                            }
                          });
                        })

                        req.body.cookingSteps.forEach((element) => {
                          console.log('Insert direction value: ', element);
                          mysql.query( `INSERT INTO Direction(step, recipeDetails_id) VALUES ('${element}', '${recipeDetailId}')`, function (error, results) {

                            if (error) {
                              console.log("Error inserting ingredient type", element, error);
                              hasError = true;
                            }
                          });
                        })
        
                      } else {
                        console.log('errorrrr', error);
                        hasError = true;
                      }
                    });
    
                  }
                });

              } else {
                hasError = true;
              }
            });

          } else {
            hasError = true;
          }
        });
    }
  });
  
  if (!hasError) {
    // Request is sucessful.
    res.send(JSON.stringify({
      "status": 200, 
      "response": 'New Recipe is successfully created.'
    }));
  } else {
    // Handle any errors found while communicating with the DB
    res.send(JSON.stringify({
      "status": 500,
      "error": error
    }));
  }
}