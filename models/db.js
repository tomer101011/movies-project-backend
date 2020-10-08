const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/./../.env' });

//create a connection to the database based on the .env file
//different between development and production
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;