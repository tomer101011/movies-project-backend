const express = require("express");
//supertest is a framework that allows to easily test web APIs
const request = require("supertest");

//import the route we are testing
const signUpRouter = require('../routes/signUp.js');
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signUpRouter);

describe("testing-signUp-route", () => {
    //after all the tests close the connection to the database
    afterAll((done) => {
        connection.destroy();
        done();
    });

    // /signup
    it("POST /signup- no catch error found", async () => {
        const user = {
            newUserName: 'tomer',
            newPassword: '4444'
        }
        const { status } = await request(app).post('/signup').send(user);
        expect(status).toEqual(200);
    });

    it("POST /signup- sign up the user. If he already exists, a message is displayed", async () => {
        const newUser = {
            newUserName: 'tomer',
            newPassword: '4444'
        }
        const { text } = await request(app).post('/signup').send(newUser);
        //expect the user to be found on the table
        expect(text).toEqual('user name taken');
    });
    ////////////////////////////////////////
});
