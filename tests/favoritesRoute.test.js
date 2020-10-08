const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const favoritesRouter = require('../routes/favoritesRoute.js');
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/favorites', favoritesRouter);

describe("testing-favorites-route", () => {
    //after all the tests close the connection to the database
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
        //expect movieId to be returned and not empty array
        expect(body[0].movieId).toEqual(favorite.movieId);
    });

    it("POST /favorites/usermovie- get the movieId of the specified user from favorites table", async () => {
        const favorite = {
            userId: 1,
            movieId: -20,
        };
        const { body } = await request(app).post('/favorites/usermovie').send(favorite);
        //expect to recieve an empty array because there is no movieId= -20 on the table
        expect(body.length).toEqual(0);
    });
    ////////////////////////////////////////

    // /favorites/insert
    it("POST /favorites/insert- data inserted successfully- no catch error found", async () => {
        const favorite = {
            userId: 3,
            movieId: 16
        };
        const { status } = await request(app).post('/favorites/insert').send(favorite);
        expect(status).toEqual(200);
    });
    ////////////////////////////////////////
});
