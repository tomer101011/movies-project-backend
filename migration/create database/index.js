const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/./../../.env' });

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

const createDatabase = () => {

    connection.query("CREATE DATABASE movieMojoDB", (error, result) => {
        if (error) throw error;

        else console.log("Database created");
        process.exit();
    });

}