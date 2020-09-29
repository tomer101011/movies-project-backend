const express = require("express");
const request = require("supertest");//supertest is a framework that allows to easily test web apis

const postersRouter = require('../routes/postersRoute.js');//import the route we are testing
const connection = require("../models/db.js");


const app = express();

app.use('/posters', postersRouter);

describe("testing-poster-route", () => {
    afterAll((done) => {
        connection.destroy();
        done();
    });

    it("GET /posters- no catch error found", async () => {
        const { status } = await request(app).get("/posters");
        expect(status).toEqual(200);
    });

    it("GET /posters- all posters really sent", async () => {
        const { body } = await request(app).get("/posters");
        expect(body).not.toEqual([]);
    });
});
