const express = require('express');
const Movie = require('../models/movies.js');

const router = express.Router();

router.post("/recent/:count", (req, res) => {
    Movie.getRecentMovies(req, res);
});

router.post("/favorites/:count", (req, res) => {
    Movie.getFavoriteMovies(req, res);
});

router.post("/topRated/:count", (req, res) => {
    Movie.getTopRatedMovies(req, res);
});

router.post("/info", (req, res) => {
    Movie.getMovieInfo(req, res);
});

module.exports = router;
