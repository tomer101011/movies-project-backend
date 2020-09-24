const express = require('express');
const Favorite = require('../models/favorites.js');

const router = express.Router();

router.post("/insert", (req, res) => {
    const favorite = new Favorite({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });
    Favorite.addFavorite(favorite, res);
});

router.post("/usermovie", (req, res) => {
    
    const favorite = new Favorite({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });
    Favorite.searchUserFavMovie(favorite, res);
});

module.exports = router;
