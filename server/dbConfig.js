/**
 * This class stores Azure MySQL credientials and related configuration functions to connect and test
 * if the backend server can communicate with the cloud database.
 */

var mysql = require('mysql');

/**
 * Azure MySQL credential
 */
var connection = mysql.createConnection({
	host: "letsgogogo.mysql.database.azure.com", 
	user: "bjj@letsgogogo", 
	password: "!23Qweasd", 
	database: "TCSS_545_GROUP_9", 
	port: 3306, 
	ssl:true
});

/**
 *  Check if the database connection is successfully establish.
 */
connection.connect(function(error){
  if (!!error){
    console.log('Failed to connect to database', error);
    throw error;
  } else{
    console.log('Database connection established.');
  }
});  


module.exports = connection;