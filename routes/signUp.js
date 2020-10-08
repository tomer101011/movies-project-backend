const express = require('express');
const User = require('../models/users');
const router = express.Router();

//sign up route
router.post("/", (req, res) => {

    const user = new User({
        userName: req.body.newUserName,
        password: req.body.newPassword,
    });
    //search the user on the Users table
    User.searchUserName(user.userName, result => {

        //if the user was not found, then we can add the new user
        if (result.length == 0) {
            User.insertUser(user, result => {
                const data = {
                    userId: result
                }
                res.send(data);
            });
        }
        else res.send('user name taken');
    });
});

module.exports = router;