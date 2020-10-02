const connection = require("./db.js");
const Favorite = require('./favorites.js');

// constructor
const Movie = function (movie) {
    this.title = movie.title;
    this.released = movie.released;
    this.runtime = movie.runtime;
    this.genre = movie.genre;
    this.director = movie.director;
    this.actors = movie.actors;
    this.plot = movie.plot;
    this.poster = movie.poster;
    this.trailer = movie.trailer;
    this.rating = movie.rating;
};

Movie.addMovie = (movie, res) => {

    const sql = 'INSERT INTO Movies SET ?';

    connection.query(sql, movie, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

Movie.deleteMovie = (movieId, res) => {

    Favorite.deleteFavoritesOfMovie(movieId);

    const sql = 'DELETE FROM Movies WHERE movieId= ?';

    connection.query(sql, [movieId], (err, result) => {
        if (err) throw err;
        res.send('movie deleted!');
    });
}

Movie.getRecentMovies = (req, res) => {
    sqlConvertReleased = `(SELECT STR_TO_DATE(released,'%d %M %Y'))`;
    let sql = '';

    if (req.params.count == 'all')
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} DESC`;
    else
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} DESC LIMIT ${req.params.count}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
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

        let sqlMovies = '';
        if (stringFavIds != '') {

            if (req.params.count == 'all')
                sqlMovies = `SELECT movieId, title, poster FROM Movies WHERE movieId IN(${stringFavIds}) ` +
                    `ORDER BY FIELD(movieId, ${stringFavIds})`;
            else
                sqlMovies = `SELECT movieId, title, poster FROM Movies WHERE movieId IN(${stringFavIds}) ` +
                    `ORDER BY FIELD(movieId, ${stringFavIds}) LIMIT ${countMovies}`;

            connection.query(sqlMovies, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } 
        else
            res.send([]);
    });
}

Movie.getTopRatedMovies = (req, res) => {
    let sql = '';
    if (req.params.count == 'all')
        sql = 'SELECT movieId, title, poster FROM Movies ORDER BY rating DESC';
    else
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY rating DESC LIMIT ${req.params.count}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

Movie.getMovieInfo = (req, res) => {
    const sql = 'SELECT * FROM Movies WHERE movieId= ?';
    connection.query(sql, [req.body.movieId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

Movie.getMovieIdByTitle = (title, cb) => {
    const sql = 'SELECT movieId FROM Movies WHERE title= ?';
    connection.query(sql, [title], (err, result) => {
        if (err) throw err;
        cb(result);
    });
}

module.exports = Movie;