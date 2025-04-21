require('dotenv').config()
const mysql = require("mysql2");

/*const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE
});*/

const conn = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE
});

conn.getConnection((err, conn) => {
	if (err) {
		console.log(`Error ${err.message}`);
		process.exit(1);
	}
	console.log(`Connection to database established. Host: ${conn.config.host}`);
});

module.exports = conn;