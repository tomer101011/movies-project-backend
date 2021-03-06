const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const moviesRouter = require('../routes/moviesRoute.js');
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', moviesRouter);

describe("testing-movies-route", () => {
    //after all the tests close the connection to the database
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /movies/recent/:count
    it("POST /movies/recent/:count- no catch error found", async () => {
        const maxRows = 10;
        const { status } = await request(app).post(`/movies/recent/${maxRows}`).send();
        expect(status).toEqual(200);
    });

    it("POST /movies/recent/:count- get recent movies, maximux count rows", async () => {
        const maxRows = 10;
        const { body } = await request(app).post(`/movies/recent/${maxRows}`).send();
        //expect the maxRows returned to be maxRows specified
        expect(body.length).toBeLessThanOrEqual(maxRows);
    });
    ////////////////////////////////////////

    // /movies/favorites/:count
    it("POST /movies/favorites/:count- no catch error found", async () => {
        const data = { userId: 1 };
        const maxRows = 4;
        const { status } = await request(app).post(`/movies/favorites/${maxRows}`).send(data);
        expect(status).toEqual(200);
    });

    it("POST /movies/favorites/:count- get favorite movies of user, maximux count rows", async () => {
        const data = { userId: 1 };
        const maxRows = 4;
        const { body } = await request(app).post(`/movies/favorites/${maxRows}`).send(data);
        //expect the maxRows returned to be maxRows specified
        expect(body.length).toBeLessThanOrEqual(maxRows);
    });
    ////////////////////////////////////////

    // /topRated/:count
    it("POST /topRated/:count- no catch error found", async () => {
        const maxRows = 8;
        const { status } = await request(app).post(`/movies/topRated/${maxRows}`).send();
        //expect the maxRows returned to be maxRows specified
        expect(status).toEqual(200);
    });

    it("POST /topRated/:count- get top rated movies, maximux count rows", async () => {
        const maxRows = 8;
        const { body } = await request(app).post(`/movies/topRated/${maxRows}`).send();
        //expect the maxRows returned to be maxRows specified
        expect(body.length).toBeLessThanOrEqual(maxRows);
    });
    ////////////////////////////////////////

    // /movies/info
    it("POST /movies/info- no catch error found", async () => {
        const data = { movieId: 1 };
        const { status } = await request(app).post('/movies/info').send(data);
        expect(status).toEqual(200);
    });

    it("POST /movies/info- movie found on the database", async () => {
        const data = { movieId: 1 };
        const { body } = await request(app).post('/movies/info').send(data);
        //expect the movie to be found on the table
        expect(body).not.toEqual([]);
    });

    it("POST /movies/info- movie found on the database", async () => {
        const data = { movieId: -20 };
        const { body } = await request(app).post('/movies/info').send(data);
        //expect the movie to not be found on the table. No movie with the specified movieId
        expect(body).toEqual([]);
    });
    ////////////////////////////////////////

    // /movies/insert
    it("POST /movies/insert- data inserted successfully- no catch error found", async () => {
        const movie = {
            movieInfo: {
                title: "The Incredible Hulk",
                released: "13 Jun 2008",
                runtime: "112 min",
                genre: "Action, Adventure, Sci-Fi",
                director: "Louis Leterrier",
                actors: "Edward Norton, Liv Tyler, Tim Roth, William Hurt",
                plot: "Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper.",
                poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_SX300.jpg",
                rating: "61"
            },
            trailer: "https://www.youtube.com/embed/xbqNb2PFKKA"
        };
        const { status } = await request(app).post('/movies/insert').send(movie);
        expect(status).toEqual(200);
    });
    ////////////////////////////////////////
});
