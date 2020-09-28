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

router.post("/insert", (req, res) => {

    const movie = new Movie({
        title: req.body.movieInfo.title,
        released: req.body.movieInfo.released,
        runtime: req.body.movieInfo.runtime,
        genre: req.body.movieInfo.genre,
        director: req.body.movieInfo.director,
        actors: req.body.movieInfo.actors,
        plot: req.body.movieInfo.plot,
        poster: req.body.movieInfo.poster,
        trailer: req.body.trailer,
        rating: req.body.movieInfo.rating
    });
    Movie.addMovie(movie, res);
});

router.post("/delete", (req, res) => {
    const movieId = req.body.movieId;
    Movie.deleteMovie(movieId, res);
});

module.exports = router;
