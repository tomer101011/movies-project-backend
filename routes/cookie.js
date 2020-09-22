const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {

    let userId = req.body.userId;
    const options = {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
    };
    res.cookie('userId', userId, options);
    res.send('cookie created');
});

module.exports = router;
