const connection = require("./db.js");
const Favorite = require('./favorites.js');

// constructor
const Movie = {};

Movie.getRecentMovies = (req, res) => {
    sqlConvertReleased = `(SELECT STR_TO_DATE(released,'%d %M %Y'))`
    const sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} DESC LIMIT ${req.params.count}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

Movie.getFavoriteMovies = (req, res) => {
    const countMovies = req.params.count;
    const userId = req.body.userId;

    Favorite.getFavoritesIds(userId, movieFavIds => {

        let stringFavIds = '';
        movieFavIds.map(item => stringFavIds += item.movieId + ',');
        stringFavIds = stringFavIds.substr(0, stringFavIds.length - 1);

        if (stringFavIds != '') {
            const sqlMovies = `SELECT movieId, title, poster FROM Movies WHERE movieId IN(${stringFavIds}) ` +
                `ORDER BY FIELD(movieId, ${stringFavIds}) LIMIT ${countMovies}`

            connection.query(sqlMovies, (err, result) => {
                if (err) {
                    console.log("error: ", err);
                }
                res.send(result);
            });
        }
    });
}

Movie.getTopRatedMovies = (req, res) => {
    const sql = `SELECT movieId, title, poster FROM Movies ORDER BY rating DESC LIMIT ${req.params.count}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

Movie.getMovieInfo = (req, res) => {
    const sql = 'SELECT * FROM Movies WHERE movieId= ?';
    connection.query(sql, [req.body.movieId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send(result);
    });
}

Movie.getMovieIdByTitle = (req, res) => {
    const sql = 'SELECT movieId FROM Movies WHERE title= ?';
    connection.query(sql, [req.body.search], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send(result);
    });
}

module.exports = Movie;