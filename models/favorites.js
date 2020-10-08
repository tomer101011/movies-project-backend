const connection = require("./db.js");

//Favorite model constructor
const Favorite = function (favorite) {
    this.userId = favorite.userId;
    this.movieId = favorite.movieId;
};

//add a favorite movie to the specified user based on the given favorite: {userId, movieId}
Favorite.addFavorite = (favorite, res) => {

    const sql = 'INSERT INTO Favorites SET ?';

    connection.query(sql, favorite, (err, result) => {
        if (err) throw err;
        res.send('favorite added!');
    });
}

//delete a favorite movie from all users based on movieId
Favorite.deleteFavoritesOfMovie = (movieId) => {
    const sql = 'DELETE FROM Favorites WHERE movieId= ?';

    connection.query(sql, [movieId], (err, result) => {
        if (err) throw err;
        res.send('favorite movie deleted from all users');
    });
}

//delete a favorite movie of the specified user
Favorite.deleteFavorite = (favorite, res) => {

    const sql = 'DELETE FROM Favorites WHERE userId= ? AND movieId= ?';

    connection.query(sql, [favorite.userId, favorite.movieId], (err, result) => {
        if (err) throw err;
        res.send('favorite deleted!');
    });
}

//return all the favorite movies of the specified user order by the last one added
//cb is a callback function
Favorite.getFavoritesIds = (userId, cb) => {
    const sqlFav = 'SELECT movieId FROM Favorites WHERE userId= ? ORDER BY indexFav DESC';
    connection.query(sqlFav, [userId], (err, result) => {
        if (err) throw err;
        cb(result);
    });
}

//return the favorite movie of the specified user
Favorite.searchUserFavMovie = (favorite, res) => {

    const sql = `SELECT movieId FROM Favorites WHERE userId= ? AND movieId= ?`;

    connection.query(sql, [favorite.userId, favorite.movieId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

module.exports = Favorite;