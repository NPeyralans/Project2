const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'active911user',
	password: 'active911password',
	database: 'active_911'
});

try {
	connection.connect(err => {
		if (err) {
			console.error("MySQL connection failed:", err.message);
			return;
		}
		console.log("Connected to MySQL");
	});
} catch(e) {
	console.error("Error during DB connection setup:", e.message);
}

module.exports = connection;
