const connection = require("./db.js");

// constructor
const Favorite = function (favorite) {
    this.userId = favorite.userId;
    this.movieId = favorite.movieId;
};

Favorite.addFavorite = (favorite, res) => {

    const sql = 'INSERT INTO Favorites SET  ?';

    connection.query(sql, favorite, (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send('favorite added!');
    });
}

Favorite.deleteFavorite= (favorite,res)=>{
    
    const sql= 'DELETE FROM Favorites WHERE userId= ? AND movieId= ?';

    connection.query(sql, [favorite.userId, favorite.movieId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send('favorite deleted!');
    });
}

Favorite.searchUserFavMovie = (favorite, res) => {

    const sql = `SELECT movieId FROM Favorites WHERE userId= ? AND movieId= ?`;

    connection.query(sql, [favorite.userId, favorite.movieId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        res.send(result);
    });
}

module.exports = Favorite;