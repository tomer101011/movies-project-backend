const connection = require("../../models/db.js");

const dropTables = () => {
    const dropPosters = "DROP TABLE Posters";
    const dropFavorites = "DROP TABLE Favorites";
    const dropUsers = "DROP TABLE Users";
    const dropMovies = "DROP TABLE Movies";

    

    connection.query(dropPosters, function (err, result) {
        if (err) throw err;
        else console.log("Posters table deleted");
    });

    connection.query(dropFavorites, function (err, result) {
        if (err) throw err;
        else console.log("Favorites table deleted");
    });

    connection.query(dropUsers, function (err, result) {
        if (err) throw err;
        else console.log("Users table deleted");
    });

    connection.query(dropMovies, function (err, result) {
        if (err) throw err;
        else console.log("Movies table deleted");
        process.exit();
    });
}

dropTables();

