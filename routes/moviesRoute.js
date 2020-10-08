const express = require('express');
const Movie = require('../models/movies.js');

const router = express.Router();

//return the recently released movies route limit by countMovies: 10, 6, 'all' etc
router.post("/recent/:count", (req, res) => {
    Movie.getRecentMovies(req, res);
});

//return the favorite movies of the user route limit by countMovies: 10, 6, 'all' etc
router.post("/favorites/:count", (req, res) => {
    Movie.getFavoriteMovies(req, res);
});

//return the top rated movies route limit by countMovies: 10, 6, 'all' etc
router.post("/topRated/:count", (req, res) => {
    Movie.getTopRatedMovies(req, res);
});

//return the info of the movie given the movieId from req.body route
router.post("/info", (req, res) => {
    Movie.getMovieInfo(req, res);
});

//insert a given movie from req.body route
router.post("/insert", (req, res) => {

    //set a placeholder picture if the movie doesn't have a picture poster
    const placeholder = 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg';

    //set a default values if the params are 'N/A' (Not announced on OMDb)
    const posterMovie = req.body.movieInfo.poster == 'N/A' ? placeholder : req.body.movieInfo.poster;
    const releasedMovie = req.body.movieInfo.released == 'N/A' ? '01 Jan 0000' : req.body.movieInfo.released;
    const ratingMovie = req.body.movieInfo.rating == 'N/A' ? 0 : req.body.movieInfo.rating;

    //add the movie to the table
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

//delete the movie given the movieId
router.post("/delete", (req, res) => {
    const movieId = req.body.movieId;
    Movie.deleteMovie(movieId, res);
});

module.exports = router;
