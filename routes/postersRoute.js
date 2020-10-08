const express = require('express');
const Poster = require('../models/posters.js');

const router = express.Router();

//get all posters route
router.get("/", (req, res) => {
    Poster.getAllPosters(res);
});

module.exports = router;
