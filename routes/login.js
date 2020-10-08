const express = require('express');
const User = require('../models/users');
const router = express.Router();

//login route
router.post("/", (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    //validate the given user and return the userId if found
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

//return the user based on userId route
router.post("/user", (req, res) => {

    const userId = req.body.userId;
    //search the user and if found return the userName and isManager
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