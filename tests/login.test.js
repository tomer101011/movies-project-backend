const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const loginRouter = require('../routes/login.js');
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRouter);

describe("testing-login-route", () => {
    //after all the tests close the connection to the database
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /login
    it("POST /login- no catch error found", async () => {
        const user = {
            userName: 'tomer',
            password: '1234'
        }
        const { status } = await request(app).post('/login').send(user);
        expect(status).toEqual(200);
    });

    it("POST /login- check if the user specified exists on the database", async () => {
        const user = {
            userName: 'blalala',
            password: 'bla123lala'
        }
        const { text } = await request(app).post('/login').send(user);
        //expect the user specified to not be found on the table
        expect(text).toEqual('user not found');
    });

    it("POST /login- check if the user specified exists on the database", async () => {
        const user = {
            userName: 'tomer',
            password: '1234'
        }
        const { body } = await request(app).post('/login').send(user);
        //expect the user specified to be found on the table
        expect(body.userId).toEqual(2);
    });
    ////////////////////////////////////////

    // /login/user
    it("POST /login/user- no catch error found", async () => {
        const user = {
            userId: '2'
        }
        const { status } = await request(app).post('/login/user').send(user);
        expect(status).toEqual(200);
    });

    it("POST /login/user- get the user name based on the userId specified", async () => {
        const user = {
            userId: '-20'
        }
        const { body } = await request(app).post('/login/user').send(user);
        //expect to return an empty object because there is no userId= -20 on the table
        expect(body).toEqual({});
    });

    it("POST /login/user- get the user name based on the userId specified", async () => {
        const user = {
            userId: '2'
        }
        const { body } = await request(app).post('/login/user').send(user);
        //expect to return the correct user name based on the userId specified
        expect(body.userName).toEqual('Tomer');
    });
    ////////////////////////////////////////
});
