const express = require('express');
const User = require('../models/users.js');

const router = express.Router();

router.get("/", (req, res) => {
    User.getAllUsers(res);
});

module.exports = router;
