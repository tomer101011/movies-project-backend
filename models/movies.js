const connection = require("./db.js");
const Favorite = require('./favorites.js');

//Movie model constructor
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

//add a new movie to Movies table
Movie.addMovie = (movie, res) => {

    const sql = 'INSERT INTO Movies SET ?';

    connection.query(sql, movie, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//delete the movie specified from Movies table
Movie.deleteMovie = (movieId, res) => {

    Favorite.deleteFavoritesOfMovie(movieId);

    const sql = 'DELETE FROM Movies WHERE movieId= ?';

    connection.query(sql, [movieId], (err, result) => {
        if (err) throw err;
        res.send('movie deleted!');
    });
}

//return the recently released movies order by the release date property
Movie.getRecentMovies = (req, res) => {

    //the released property of the table needs to be converted to datetime
    //because the omdb date given is not of datetime format
    sqlConvertReleased = `(SELECT STR_TO_DATE(released,'%d %M %Y'))`;
    let sql = '';
    //how much movies do you want to fetch from the table
    countMovies = req.params.count;

    //check if the user wants to return all the recently released movies or only some of them
    if (countMovies == 'all')
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} DESC`;
    else
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY ${sqlConvertReleased} DESC LIMIT ${countMovies}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//return the favorite movies of the user
Movie.getFavoriteMovies = (req, res) => {

    //how much movies do you want to fetch from the table
    const countMovies = req.params.count;
    const userId = req.body.userId;

    //First get all the favorite movies movieIds of the user
    Favorite.getFavoritesIds(userId, movieFavIds => {

        //then we want to format the returned array as a string like: "4,1,6,2" etc
        let stringFavIds = '';
        movieFavIds.map(item => stringFavIds += item.movieId + ',');
        //drop the last ',' from stringFavIds string
        stringFavIds = stringFavIds.substr(0, stringFavIds.length - 1);

        //now we want to fetch the movies in the given order of stringFavIds
        //the query always organise the items in the SQL IN(...) from min to max
        //like: "1,2,4,6" and not the in the wanted order: "4,1,6,2"
        //so we want to use the FIELD on the SQL to specify the above order.
        let sqlMovies = '';
        //if favorites ids were found on the Favorites table
        if (stringFavIds != '') {

            //check if the user wants to return all the favorite movies or only some of them
            if (countMovies == 'all')
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
        //no favorite ids were found on the Favorites table
        else
            res.send([]);
    });
}

//return the top rated movies order by the rating property
Movie.getTopRatedMovies = (req, res) => {

    //how much movies do you want to fetch from the table
    const countMovies = req.params.count;
    let sql = '';
    //check if the user wants to return all the top rated movies or only some of them
    if (countMovies == 'all')
        sql = 'SELECT movieId, title, poster FROM Movies ORDER BY rating DESC';
    else
        sql = `SELECT movieId, title, poster FROM Movies ORDER BY rating DESC LIMIT ${countMovies}`;

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//return the info of the movie based on movieId
Movie.getMovieInfo = (req, res) => {
    const sql = 'SELECT * FROM Movies WHERE movieId= ?';
    connection.query(sql, [req.body.movieId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//return the movieId based on the title
//cb is a callback function
Movie.getMovieIdByTitle = (title, cb) => {
    const sql = 'SELECT movieId FROM Movies WHERE title= ?';
    connection.query(sql, [title], (err, result) => {
        if (err) throw err;
        cb(result);
    });
}

module.exports = Movie;