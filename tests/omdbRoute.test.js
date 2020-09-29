const express = require("express");
const request = require("supertest");//supertest is a framework that allows to easily test web apis

const omdbRouter = require('../routes/omdbRoute.js');//import the route we are testing
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/omdb', omdbRouter);

describe("testing-omdb-route", () => {
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /omdb
    it("POST /omdb- no catch error found", async () => {
        const searchMovie = {
            search: 'rise of skywalker'
        }
        const { status } = await request(app).post('/omdb').send(searchMovie);
        expect(status).toEqual(200);
    });

    it("POST /omdb- no catch error found", async () => {
        const searchMovie = {
            search: 'the rise of skywalker'
        }
        const { body } = await request(app).post('/omdb').send(searchMovie);
        expect(body.movieId.length).not.toEqual(0);
    });
    ////////////////////////////////////////
});