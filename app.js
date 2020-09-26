const express = require('express');
const cors = require("cors");

//all backend routes
const indexRouter = require('./routes/index.js');
const moviesRouter = require('./routes/moviesRoute.js');
const postersRouter = require('./routes/postersRoute.js');
const loginRouter = require('./routes/login.js');
const signUpRouter = require('./routes/signUp.js');
const favoritesRouter = require('./routes/favoritesRoute.js');
const omdbRouter = require('./routes/omdbRoute.js');
const ytbRouter = require('./routes/ytbRoute.js');

const port = 9000;
const app = express();

//allow cross platform connection for frontend and backend
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//all backend routes
app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/posters', postersRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/favorites', favoritesRouter);
app.use('/omdb', omdbRouter);
app.use('/ytb', ytbRouter);


app.listen(port, () => { console.log(`Listen to port ${port}`) });