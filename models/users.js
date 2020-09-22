const connection = require("./db.js");

// constructor
const User = {};

User.validateUser = (userName, password, cb) => {
    const sql = 'SELECT userId, userName FROM Users where userName= ? AND password= ?'
    connection.query(sql, [userName, password], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        cb(result);
    });
}

User.searchUserById = (userId, cb) => {
    const sql = 'SELECT userName FROM Users where userId= ? '
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        cb(result);
    });
}

module.exports = User;