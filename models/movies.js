const connection = require("./db.js");

// constructor
const Movie = {};

Movie.getRecentMovies = (req, res) => {
    sqlConvertReleased = `(select str_to_date(released,'%d %M %Y'))`
    const sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} desc LIMIT ${req.params.count}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

Movie.getFavoritesIds = (userId, cb) => {
    const sqlFav = 'SELECT movieId FROM Favorites WHERE userId= ? ORDER BY indexFav DESC';
    connection.query(sqlFav, [userId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        cb(result);
    });
}

Movie.getFavoriteMovies = (req, res) => {
    const countMovies = req.params.count;
    const userId = req.body.userId;

    Movie.getFavoritesIds(userId, movieFavIds => {

        let stringFavIds = '';
        for (let i = 0; i < movieFavIds.length; i++)
            stringFavIds += movieFavIds[i].movieId+',';
        stringFavIds = stringFavIds.substr(0, stringFavIds.length - 1);

        const sqlMovies = `SELECT movieId, title, poster FROM Movies WHERE movieId IN(${stringFavIds}) ` +
            `ORDER BY FIELD(movieId, ${stringFavIds}) LIMIT ${countMovies}`

        connection.query(sqlMovies, (err, result) => {
            if (err) {
                console.log("error: ", err);
            }
            res.send(result);
        });
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

Movie.getMovieInfo = (req, res) => {
    const sql = 'SELECT * FROM Movies WHERE movieId= ?';
    connection.query(sql, [req.body.movieId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send(result);
    });
}

module.exports = Movie;