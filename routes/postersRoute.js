const express = require('express');
const Movie = require('../models/posters.js');

const router = express.Router();

//get home page
router.get("/", (req, res) => {
    Movie.getAllPosters(res);
});

module.exports = router;
