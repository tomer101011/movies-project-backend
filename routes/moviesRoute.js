const express = require('express');
const Movie = require('../models/movies.js');

const router = express.Router();

//get home page
router.get("/", (req, res) => {
    Movie.getAllMovies(res);
});

module.exports = router;
