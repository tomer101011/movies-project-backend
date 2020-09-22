const express = require('express');
const Movie = require('../models/movies.js');

const router = express.Router();

router.get("/recent", (req, res) => {
    Movie.getAllMovies(res);
});

module.exports = router;
