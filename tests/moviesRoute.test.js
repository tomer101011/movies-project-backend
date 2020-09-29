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

    it("POST /movies/info- no catch error found", async () => {
        const data = { movieId: 1 };
        const { status } = await request(app).post("/movies/info").send(data);
        expect(status).toEqual(200);
    });

    it("POST /movies/info- movieId really found on the database", async () => {
        const data = { movieId: 1 };
        const { body } = await request(app).post("/movies/info").send(data);
        expect(body).not.toEqual([]);
    });
});
