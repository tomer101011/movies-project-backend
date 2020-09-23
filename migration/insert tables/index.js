const connection = require("../../models/db.js");
const users = require('./users.json');
const movies = require('./movies.json');
const posters = require('./posters.json');
const favorites = require('./favorites.json');

const createTables = () => {
    const tableUsers = `CREATE TABLE Users (
        userId int NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        isManager boolean  NOT NULL,
        PRIMARY KEY (userId)
    )`;

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

    const tablePosters = `CREATE TABLE Posters (
        posterId int NOT NULL AUTO_INCREMENT,
        movieId int NOT NULL,
        poster varchar(255) NOT NULL,
        PRIMARY KEY (posterId),
        FOREIGN KEY (movieId) references Movies(movieId)
    )`;

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

const insertUsers = () => {
    let values = '';
    users.map(user => {
        values += `(${user.userId},'${user.username}','${user.password}',${user.isManager}),`;
    });

    //drop the last ',' from the string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Users VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Users inserted");
    });
}

const insertMovies = () => {
    let values = '';
    movies.map(movie => {
        values += `(` +
            ` ${movie.movieId},` +
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

    //drop the last ',' from the string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Movies VALUES ${values} `;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Movies inserted");
    });
}

const insertPosters = () => {
    let values = '';
    posters.map(poster => {
        values += `(${poster.posterId},'${poster.movieId}','${poster.poster}'),`;
    });

    //drop the last ',' from the string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Posters VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Posters inserted");
    });
}

const insertFavorites = () => {
    let values = '';
    favorites.map(favorite => {
        values += `(${favorite.indexFav},'${favorite.userId}','${favorite.movieId}'),`;
    });

    //drop the last ',' from the string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Favorites VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        else console.log("Favorites inserted");
    });
}

createTables();
insertUsers();
insertMovies();
insertPosters();
insertFavorites();

