const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.post("/", (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    User.validateUser(userName, password, result => {

        if (result.length == 0)
            res.send('user not found');

        else {
            const data = {
                userId: result[0].userId
            }
            res.send(data)
        }
    });

});

router.post("/user", (req, res) => {

    const userId = req.body.userId;
    User.searchUserById(userId, result => {
        if (result.length == 0)
            res.send('user not found');

        else {
            const data = {
                userName: result[0].userName,
                isManager: result[0].isManager
            }
            res.send(data);
        }
    })


});

module.exports = router;