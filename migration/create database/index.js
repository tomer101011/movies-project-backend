const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "tomer",
    password: "180193St"
});

connection.connect(error => {
    if (error) { console.log('No Database created'); return; }
    console.log("Successfully connected");

    createDatabase();

});

const createDatabase = () => {

    connection.query("CREATE DATABASE movieMojoDB", (error, result) => {
        if (error) {
            console.log("Database already exists");
            process.exit();
        }
        else {
            console.log("Database created");
            process.exit()
        }
    });
    
}