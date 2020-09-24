const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "tomer",
    password: "180193St"
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