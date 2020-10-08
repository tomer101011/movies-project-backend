const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/./../../.env' });

//open connection based on the .env file
//different between development and production
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected");

    createDatabase();
});

//create the database
const createDatabase = () => {

    const createDB = `CREATE DATABASE ${process.env.DATABASE}`;
    connection.query(createDB, (error, result) => {
        if (error) throw error;

        else console.log("Database created");
        process.exit();
    });

}