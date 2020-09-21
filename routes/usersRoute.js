const express = require('express');
const User = require('../models/users.js');

const router = express.Router();

//get home page
router.get("/", (req, res) => {
    User.getAllUsers(res);
});

module.exports = router;
