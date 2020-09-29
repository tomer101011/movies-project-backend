const express = require("express");
const request = require("supertest");//supertest is a framework that allows to easily test web apis

const signUpRouter = require('../routes/signUp.js');//import the route we are testing
const connection = require("../models/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signUpRouter);

describe("testing-signUp-route", () => {
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
        expect(text).toEqual('user name taken');
    });
    ////////////////////////////////////////
});
