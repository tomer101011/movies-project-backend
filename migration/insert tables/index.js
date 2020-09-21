const mysql = require('mysql');
const users = require('./users.json');
const movies = require('./movies.json');

const connection = mysql.createConnection({
    host: "localhost",
    user: "tomer",
    password: "180193St",
    database: "movieMojoDB"
});

connection.connect(error => {
    if (error){ console.log('No Database created'); return; }
    console.log("Successfully connected to the database");

    createTables();
    insertUsers();
    insertMovies();

});

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
        name varchar(255) NOT NULL,
        picture varchar(255) NOT NULL,
        PRIMARY KEY (movieId)
    )`;

    connection.query(tableUsers, (error, result) => {
        if (error)
            console.log("Users table already exists");
        else
            console.log("Users table created");
    });

    connection.query(tableMovies, (error, result) => {
        if (error)
            console.log("Movies table already exists");

        else
            console.log("Movies table created");
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
        if (err) console.log('Users can not be added. Drop table to add again');
        else console.log("Users inserted");
    });
}

const insertMovies = () => {
    let values = '';
    movies.map(movie => {
        values += `(${movie.movieId},'${movie.name}','${movie.picture}'),`;
    });

    //drop the last ',' from the string
    values = values.substr(0, values.length - 1);

    const sql = `INSERT INTO Movies VALUES ${values}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('Movies can not be added. Drop table to add again');
            process.exit();
        }
        else {
            console.log("Movies inserted");
            process.exit();
        }
    });
}