const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const omdbRouter = require('../routes/omdbRoute.js');
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/omdb', omdbRouter);

describe("testing-omdb-route", () => {
    //after all the tests close the connection to the database
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /omdb
    it("POST /omdb- no catch error found", async () => {
        const searchMovie = {
            search: 'rise of skywalker'
        }
        const result = await request(app).post('/omdb').send(searchMovie);
        expect(result.status).toEqual(200);
        expect(result.body.movieId.length).not.toEqual(0);
    });

    it("POST /omdb- get the movieId of the specified movie if it exists on the database", async () => {
        const searchMovie = {
            search: 'Ben Hur'
        }
        const { body } = await request(app).post('/omdb').send(searchMovie);
        //expect the movie name to not be found on the table
        expect(body.movieId.length).toEqual(0);
    });
    //////////////////////////////////////
});
