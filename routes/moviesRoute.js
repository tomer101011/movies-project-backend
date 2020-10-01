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
    const placeholder = 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg';

    const posterMovie = req.body.movieInfo.poster == 'N/A' ? placeholder : req.body.movieInfo.poster;
    const releasedMovie = req.body.movieInfo.released == 'N/A' ? '01 Jan 0000' : req.body.movieInfo.released;
    const ratingMovie = req.body.movieInfo.rating == 'N/A' ? 0 : req.body.movieInfo.released;

    const movie = new Movie({
        title: req.body.movieInfo.title,
        released: releasedMovie,
        runtime: req.body.movieInfo.runtime,
        genre: req.body.movieInfo.genre,
        director: req.body.movieInfo.director,
        actors: req.body.movieInfo.actors,
        plot: req.body.movieInfo.plot,
        poster: posterMovie,
        trailer: req.body.trailer,
        rating: ratingMovie
    });
    Movie.addMovie(movie, res);
});

router.post("/delete", (req, res) => {
    const movieId = req.body.movieId;
    Movie.deleteMovie(movieId, res);
});

module.exports = router;
