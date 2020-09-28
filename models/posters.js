const connection = require("./db.js");

// constructor
const Poster = {};

Poster.getAllPosters = (res) => {
    const sql = 'SELECT * FROM Posters';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

module.exports = Poster;