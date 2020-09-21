const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "tomer",
    password: "180193St",
    database: "movieMojoDB"
});

connection.connect(error => {
    if (error) { console.log('No Database created'); return; }
    console.log("Successfully connected to the database");

    dropTables();
});

const dropTables = () => {
    const dropUsers = "DROP TABLE Users";
    const dropMovies = "DROP TABLE Movies";

    connection.query(dropUsers, function (err, result) {
        if (err) console.log("Users table does not exists. Create the table first");
        else console.log("Users table deleted");
    });

    connection.query(dropMovies, function (err, result) {
        if (err) {
            console.log("Movies table does not exists. Create the table first");
            process.exit();
        }
        else {
            console.log("Movies table deleted");
            process.exit();
        }
    });
}