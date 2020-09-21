const connection = require("./db.js");

// constructor
const Movie = {};

Movie.getAllMovies = (res) => {
    const sql='SELECT movieId, title, poster FROM Movies';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

module.exports = Movie;