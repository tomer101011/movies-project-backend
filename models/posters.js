const connection = require("./db.js");

//Poster model constructor
const Poster = {};

//return all the posters from the table
Poster.getAllPosters = (res) => {
    const sql = 'SELECT * FROM Posters';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

module.exports = Poster;