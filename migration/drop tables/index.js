const connection = require("../../models/db.js");

const dropTables = () => {
    const dropUsers = "DROP TABLE Users";
    const dropPosters = "DROP TABLE Posters";
    const dropMovies = "DROP TABLE Movies";

    connection.query(dropUsers, function (err, result) {
        if (err) throw err;
        else console.log("Users table deleted");
    });

    connection.query(dropPosters, function (err, result) {
        if (err) throw err;
        else console.log("Posters table deleted");
    });

    connection.query(dropMovies, function (err, result) {
        if (err) throw err;
        else console.log("Movies table deleted");
    });
}

dropTables();

