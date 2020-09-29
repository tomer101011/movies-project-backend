const connection = require("./db.js");

// constructor
const Poster = {};

Poster.getAllPosters = (res) => {
    const sql = 'SELECT * FROM Posters';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

module.exports = Poster;