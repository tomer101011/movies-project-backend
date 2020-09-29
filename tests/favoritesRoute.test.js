const express = require("express");
const request = require("supertest");//supertest is a framework that allows to easily test web apis

const favoritesRouter = require('../routes/favoritesRoute.js');//import the route we are testing
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/favorites', favoritesRouter);

describe("testing-favorites-route", () => {
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /favorites/usermovie
    it("POST /favorites/usermovie- no catch error found", async () => {
        const favorite = {
            userId: 1,
            movieId: 1
        };
        const { status } = await request(app).post('/favorites/usermovie').send(favorite);
        expect(status).toEqual(200);
    });

    it("POST /favorites/usermovie- get the movieId of the specified user from favorites table", async () => {
        const favorite = {
            userId: 1,
            movieId: 1,
        };
        const { body } = await request(app).post('/favorites/usermovie').send(favorite);
        expect(body[0].movieId).toEqual(favorite.movieId);
    });

    it("POST /favorites/usermovie- get the movieId of the specified user from favorites table", async () => {
        const favorite = {
            userId: 1,
            movieId: -20,
        };
        const { body } = await request(app).post('/favorites/usermovie').send(favorite);
        expect(body.length).toEqual(0);
    });
    ////////////////////////////////////////
});
