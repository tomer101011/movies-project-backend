const express = require('express');
const cors = require("cors");

//all backend routes
const indexRouter = require('./routes/index.js');
const moviesRouter = require('./routes/moviesRoute.js');
const usersRouter = require('./routes/usersRoute.js');

const port = 9000;
const app = express();

//allow cross platform connection for frontend and backend
app.use(cors());

//all backend routes
app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);











app.listen(port, () => { console.log(`Listen to port ${port}`) });