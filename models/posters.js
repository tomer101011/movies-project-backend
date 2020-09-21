const connection = require("./db.js");

// constructor
const Poster = {};

Poster.getAllPosters = (res) => {
    const sql = 'SELECT Movies.movieId, Movies.title, Posters.poster ' +
        'FROM Movies INNER JOIN Posters ' +
        'ON Movies.movieId = Posters.movieId';
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
            res.send(result);
        });
}

module.exports = Poster;