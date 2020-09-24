const connection = require("./db.js");

// constructor
const User = function (user) {
    this.userName = user.userName;
    this.password = user.password;
    this.isManager = false;
};

User.validateUser = (userName, password, cb) => {
    const sql = 'SELECT userId FROM Users where userName= ? AND password= ?';
    connection.query(sql, [userName, password], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        cb(result);
    });
}

User.insertUser = (user, cb) => {
    const sql = 'INSERT INTO Users SET  ?'
    connection.query(sql, user, (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        cb(result.insertId);
    });
}

User.searchUserById = (userId, cb) => {
    const sql = 'SELECT userName, isManager FROM Users where userId= ? '
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        cb(result);
    });
}

User.searchUserUserName = (userName, cb) => {
    const sql = 'SELECT userId FROM Users where userName= ? '
    connection.query(sql, [userName], (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        cb(result);
    });
}

module.exports = User;