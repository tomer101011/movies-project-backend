const express = require('express');
const axios = require('axios');
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

                const server_path = process.env.SERVER_PATH
                const urlYTB = `${server_path}/ytb`;
                axios.post(urlYTB, { search: movieInfo.title })
                    .then(resYTB => {
                        const trailer = resYTB.data;

                        const urlMovieDB = `${server_path}/movies/title`;
                        axios.post(urlMovieDB, { search: movieInfo.title })
                            .then(resMovieDB => {

                                const movieId = resMovieDB.data;
                                const data = {
                                    movieInfo: movieInfo,
                                    trailer: trailer,
                                    movieId: movieId
                                }
                                res.send(data);

                            })
                            .catch(err => { console.log(err); })
                    })
                    .catch(err => { console.log(err); })
            }
            else
                res.send('movie not found');
        })
        .catch(err => { console.log(err); })
});

module.exports = router;