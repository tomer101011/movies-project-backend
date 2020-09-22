const connection = require("./db.js");

// constructor
const Movie = {};

Movie.getRecentMovies = (req, res) => {
    const sql = `SELECT movieId, title, poster FROM Movies ORDER BY released desc LIMIT ${req.params.count}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

Movie.getTopRatedMovies = (req, res) => {
    const sql = `SELECT movieId, title, poster FROM Movies ORDER BY rating desc LIMIT ${req.params.count}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

module.exports = Movie;