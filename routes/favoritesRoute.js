const express = require('express');
const Favorite = require('../models/favorites.js');

const router = express.Router();

//insert to favorites route
router.post("/insert", (req, res) => {
    const favorite = new Favorite({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });
    Favorite.addFavorite(favorite, res);
});

//delete from favorites route
router.post("/delete", (req, res) => {
    const favorite = new Favorite({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });
    Favorite.deleteFavorite(favorite, res);
});

//get the favorite movie of the specified user route
router.post("/usermovie", (req, res) => {
    
    const favorite = new Favorite({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });
    Favorite.searchUserFavMovie(favorite, res);
});

module.exports = router;
