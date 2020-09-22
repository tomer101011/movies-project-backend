const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');


//all backend routes
const indexRouter = require('./routes/index.js');
const moviesRouter = require('./routes/moviesRoute.js');
const postersRouter = require('./routes/postersRoute.js');
const usersRouter = require('./routes/usersRoute.js');
const cookieRouter = require('./routes/cookie.js');
const loginRouter = require('./routes/login.js');

const port = 9000;
const app = express();

//allow cross platform connection for frontend and backend
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//all backend routes
app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/posters', postersRouter);
app.use('/users', usersRouter);
app.use('/cookie', cookieRouter);
app.use('/login', loginRouter);


app.listen(port, () => { console.log(`Listen to port ${port}`) });