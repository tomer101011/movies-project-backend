const mysql = require('mysql');
const config = require("../../models/config.js");

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password
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