const axios = require('axios');
const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.post("/", (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    User.validateUser(userName, password, result => {
        if (result == [])
            res.send('not found');

        else {
            const url = "http://localhost:9000/cookie"
            axios.post((url), {
                userId: result[0].userId
            })
                .then(() => {
                    res.send(result[0].userName)
                })

                .catch(err => {
                    console.log(err);
                });
        }
    });
});

router.get("/", (req, res) => {

    const userId = req.cookies.userId;
    User.searchUserById(userId, result => {
        if (result == [])
            res.send('not found');
        else
            res.send(result.userName);
    });
    // res.clearCookie("userId");
});

module.exports = router;