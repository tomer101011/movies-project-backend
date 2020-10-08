const connection = require("../../models/db.js");
const users = require('./users.json');
const movies = require('./movies.json');
const posters = require('./posters.json');
const favorites = require('./favorites.json');

//create all the tables listed in here
const createTables = () => {
    //Users table
    const tableUsers = `CREATE TABLE Users (
        userId int NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        isManager boolean  NOT NULL,
        PRIMARY KEY (userId)
    )`;

    //Movies table
    const tableMovies = `CREATE TABLE Movies (
        movieId int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        released varchar(255) NOT NULL,
        runtime varchar(255) NOT NULL,
        genre varchar(255) NOT NULL,
        director varchar(255) NOT NULL,
        actors varchar(255) NOT NULL,
        plot varchar(255) NOT NULL,
        poster varchar(255) NOT NULL,
        trailer varchar(255) NOT NULL,
        rating int NOT NULL,
        PRIMARY KEY (movieId)
    )`;

    //Posters table
    const tablePosters = `CREATE TABLE Posters (
        posterId int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        plot varchar(255) NOT NULL,
        poster varchar(255) NOT NULL,
        PRIMARY KEY (posterId)
    )`;

    //Favorites table
    const tableFavorites = `CREATE TABLE Favorites (
        indexFav int NOT NULL AUTO_INCREMENT,
        userId int NOT NULL,
        movieId int NOT NULL,
        PRIMARY KEY (indexFav),
        FOREIGN KEY (userId) references Users(userId),
        FOREIGN KEY (movieId) references Movies(movieId)
    )`;

    connection.query(tableUsers, (error, result) => {
        if (error) throw error;
        else
            console.log("Users table created");
    });

    connection.query(tableMovies, (error, result) => {
        if (error) throw error;

        else
            console.log("Movies table created");
    });

    connection.query(tablePosters, (error, result) => {
        if (error) throw error;

        else
            console.log("Posters table created");
    });

    connection.query(tableFavorites, (error, result) => {
        if (error) throw error;

        else
            console.log("Favorites table created");
    });
}

//insert rows to Users table based on the given json file
const insertUsers = () => {

    //values string will be: (userId, username, password), (...), (...) etc
    let values = '';
    users.map(user => {
        values += `(${user.userId},'${user.username}','${user.password}',${user.isManager}),`;
    });

    //drop the last ',' from values string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Users VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Users inserted");
    });
}

//insert rows to Movies table based on the given json file
const insertMovies = () => {
    
    //same as above
    let values = '';
    movies.map(movie => {
        values += `(` +
            `${movie.movieId},` +
            `'${movie.title}',` +
            `'${movie.released}', ` +
            `'${movie.runtime}',` +
            `'${movie.genre}', ` +
            `'${movie.director}',` +
            `'${movie.actors}', ` +
            `'${movie.plot}',` +
            `'${movie.poster}', ` +
            `'${movie.trailer}',` +
            `${movie.rating}` +
            `),`;
    });

    //drop the last ',' from values string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Movies VALUES ${values} `;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Movies inserted");
    });
}

//insert rows to Posters table based on the given json file
const insertPosters = () => {

    //same as above
    let values = '';
    posters.map(poster => {
        values += `(${poster.posterId},'${poster.title}','${poster.plot}','${poster.poster}'),`;
    });

    //drop the last ',' from values string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Posters VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Posters inserted");
    });
}

//insert rows to Favorites table based on the given json file
const insertFavorites = () => {

    //same as above
    let values = '';
    favorites.map(favorite => {
        values += `(${favorite.indexFav},'${favorite.userId}','${favorite.movieId}'),`;
    });

    //drop the last ',' from values string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Favorites VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Favorites inserted");
        process.exit();
    });
}

createTables();
insertUsers();
insertMovies();
insertPosters();
insertFavorites();


