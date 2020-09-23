const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.post("/", (req, res) => {
    const user = new User({
        userName: req.body.newUserName,
        password: req.body.newPassword,
    });
    User.searchUserUserName(user.userName, result => {
        if (result.length == 0) {
            User.insertUser(user, result => {
                const data = {
                    userId: result,
                    userName: user.userName
                }
                res.send(data);
            });
        }
        else res.send('user name taken');
    });


});

module.exports = router;