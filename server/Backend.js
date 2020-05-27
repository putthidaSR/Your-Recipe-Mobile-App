const mysql = require('mysql');

// Create a mysql connection with host, username, and password
let conn = mysql.createConnection({
	host: "letsgogogo.mysql.database.azure.com", 
	user: "bjj@letsgogogo", 
	password: "!23Qweasd", 
	database: "wwii_db", 
	port: 3306, 
	ssl:true
});

// Check if login successfully
conn.connect(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
       readData();
	}	
});


// Query the DB and print results
function readData(){
	conn.query('SELECT * FROM ships', function (err, results, fields) {
		if (err) throw err;
		else console.log('Selected ' + results.length + ' row(s).');
		for (i = 0; i < results.length; i++) {
			console.log('Row: ' + JSON.stringify(results[i]));
		}
		console.log('Select all data from the Ships table.');
		console.log('Done.');
	})

    conn.end(function (err) { 
		if (err) throw err;
		else  console.log('Closing connection.') 
	});
};