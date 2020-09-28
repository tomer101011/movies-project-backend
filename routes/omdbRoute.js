const express = require('express');
const axios = require('axios');
const Movie = require('../models/movies.js');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post("/", (req, res) => {
    const searchMovie = req.body.search;
    const OMDB_API_KEY = process.env.OMDB_API;
    const urlOMDb = `http://www.omdbapi.com/?t=${searchMovie}&apikey=${OMDB_API_KEY}`;

    axios.get(urlOMDb)
        .then(resOMDb => {
            if (resOMDb.data.Title !== undefined) {
                const movieInfo = {
                    title: resOMDb.data.Title,
                    released: resOMDb.data.Released,
                    runtime: resOMDb.data.Runtime,
                    genre: resOMDb.data.Genre,
                    director: resOMDb.data.Director,
                    actors: resOMDb.data.Actors,
                    plot: resOMDb.data.Plot,
                    poster: resOMDb.data.Poster,
                    rating: resOMDb.data.Metascore
                }

                const YTB_API_KEY = process.env.YTB_API;
                const urlYTB = `https://www.googleapis.com/youtube/v3/search?q=${movieInfo.title} movie trailer&maxResults=1&key=${YTB_API_KEY}`;
                axios.get(urlYTB)
                    .then(resYTB => {

                        const trailer = `https://www.youtube.com/embed/${resYTB.data.items[0].id.videoId}`;
                        Movie.getMovieIdByTitle(movieInfo.title, result => {

                            const movieId = result;

                            const data = {
                                movieInfo: movieInfo,
                                trailer: trailer,
                                movieId: movieId
                            }
                            res.send(data);
                        });
                    })
                    .catch(err => { console.log(err); })
            }
            else
                res.send('movie not found');
        })
        .catch(err => { console.log(err); })
});

module.exports = router;