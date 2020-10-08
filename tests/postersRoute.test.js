const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const postersRouter = require('../routes/postersRoute.js');
const connection = require("../models/db.js");

const app = express();

app.use('/posters', postersRouter);

describe("testing-poster-route", () => {
    //after all the tests close the connection to the database
    afterAll((done) => {
        connection.destroy();
        done();
    });

    it("GET /posters- no catch error found", async () => {
        const { status } = await request(app).get("/posters");
        expect(status).toEqual(200);
    });

    it("GET /posters- all posters sent", async () => {
        const { body } = await request(app).get("/posters");
        //expect to get all the posters from the table
        expect(body).not.toEqual([]);
    });
});
