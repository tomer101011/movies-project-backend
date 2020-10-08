const express = require('express');
const router = express.Router();

//Server Online route
router.get('/', function (req, res, next) {

  res.send('<h1 style="text-align:center">Server online!</h1>');
  
});

module.exports = router;
