const express = require('express');
const axios = require('axios');
const apiKeys = require('../models/apiKeys.js')

const router = express.Router();

router.post("/", (req, res) => {
    const searchMovie= req.body.search;
    const YTB_API_KEY = apiKeys.ytbApi;
    const urlYoutube = `https://www.googleapis.com/youtube/v3/search?q=${searchMovie} movie trailer&maxResults=1&key=${YTB_API_KEY}`;
    
    axios.get(urlYoutube)
        .then(resYTB => {

            const trailer = `https://www.youtube.com/embed/${resYTB.data.items[0].id.videoId}`;
            res.send(trailer);
        })
        .catch(err => {
            res.send(err);
        })
});

module.exports = router;