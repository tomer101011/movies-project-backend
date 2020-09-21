const connection = require("./db.js");

// constructor
const Movie ={};

Movie.getAllMovies = (res) => {
    connection.query("SELECT * FROM Movies", (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

module.exports = Movie;