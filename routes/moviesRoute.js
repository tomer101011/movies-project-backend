const express = require('express');
const Movie = require('../models/movies.js');

const router = express.Router();

router.get("/recent/:count", (req, res) => {
    Movie.getRecentMovies(req,res);
});

// router.get("/favorites/:count", (req, res) => {
//     Movie.getFavoriteMovies(res);
// });

router.get("/topRated/:count", (req, res) => {
    Movie.getTopRatedMovies(req,res);
});

module.exports = router;
