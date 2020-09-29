const express = require("express");
const request = require("supertest");//supertest is a framework that allows to easily test web apis

const moviesRouter = require('../routes/moviesRoute.js');//import the route we are testing
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', moviesRouter);

describe("testing-movies-route", () => {
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
        expect(body.length).toBeLessThanOrEqual(maxRows);
    });
    ////////////////////////////////////////

    // /topRated/:count
    it("POST /topRated/:count- no catch error found", async () => {
        const maxRows = 8;
        const { status } = await request(app).post(`/movies/topRated/${maxRows}`).send();
        expect(status).toEqual(200);
    });

    it("POST /topRated/:count- get top rated movies, maximux count rows", async () => {
        const maxRows = 8;
        const { body } = await request(app).post(`/movies/topRated/${maxRows}`).send();
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
        expect(body).not.toEqual([]);
    });

    it("POST /movies/info- movie found on the database", async () => {
        const data = { movieId: -20 };
        const { body } = await request(app).post('/movies/info').send(data);
        expect(body).toEqual([]);
    });
    ////////////////////////////////////////
});
