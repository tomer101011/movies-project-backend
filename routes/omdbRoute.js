const express = require('express');
const axios = require('axios');
const Movie = require('../models/movies.js');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

//OMDb route
//return the info of the movie from OMDb and Youtube given the search string
router.post("/", (req, res) => {

    //the search string
    const searchMovie = req.body.search;

    const OMDB_API_KEY = process.env.OMDB_API;
    const urlOMDb = `http://www.omdbapi.com/?t=${searchMovie}&apikey=${OMDB_API_KEY}`;

    //fetch the movie info from OMDb given the search string
    axios.get(urlOMDb)
        .then(resOMDb => {
            //if the result from OMDb found and not undefined
            if (resOMDb.data.Title !== undefined) {

                //save the result on movieInfo object
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

                //we still need to get the trailer
                //It's not stored on OMDb but on Youtube API
                const YTB_API_KEY = process.env.YTB_API;
                const urlYTB = `https://www.googleapis.com/youtube/v3/search?q=${movieInfo.title} movie trailer&maxResults=1&key=${YTB_API_KEY}`;

                //fetch the trailer id from Youtube API
                axios.get(urlYTB)
                    .then(resYTB => {

                        const trailer = `https://www.youtube.com/embed/${resYTB.data.items[0].id.videoId}`;
                        
                        //we also want to fetch the movieId from the Movies table
                        //to notify the user if the movie exists on the web app
                        Movie.getMovieIdByTitle(movieInfo.title, result => {

                            const movieId = result;

                            //the data to be sent from the route
                            const data = {
                                movieInfo: movieInfo,// the info of the movie
                                trailer: trailer,// the youtube trailer url (embed)
                                movieId: movieId// the movieId if it exists on the web app
                            }
                            res.send(data);
                        });
                    })
                    .catch(err => { console.log(err); })
            }
            //else the movie was not found on OMDb
            else
                res.send('movie not found');
        })
        .catch(err => { console.log(err); })
});

module.exports = router;