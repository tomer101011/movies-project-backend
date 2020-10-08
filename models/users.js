const connection = require("./db.js");

//User model constructor
const User = function (user) {
    this.userName = user.userName;
    this.password = user.password;
    this.isManager = false;
};

//validate the user on the table and return the userId if validated
//cb is a callback function
User.validateUser = (userName, password, cb) => {
    const sql = 'SELECT userId FROM Users WHERE userName= ? AND password= ?';
    connection.query(sql, [userName, password], (err, result) => {

        if (err) throw err;
        cb(result);
    });
}

//insert a given user to the table
//cb is a callback function
User.insertUser = (user, cb) => {
    const sql = 'INSERT INTO Users SET ?'
    connection.query(sql, user, (err, result) => {

        if (err) throw err;
        cb(result.insertId);
    });
}

//return the user given the userId
//cb is a callback function
User.searchUserById = (userId, cb) => {
    const sql = 'SELECT userName, isManager FROM Users where userId= ? '
    connection.query(sql, [userId], (err, result) => {

        if (err) throw err;
        cb(result);
    });
}

//return the userId given his userName
//cb is a callback function
User.searchUserName = (userName, cb) => {
    const sql = 'SELECT userId FROM Users WHERE userName= ? '
    connection.query(sql, [userName], (err, result) => {

        if (err) throw err;
        cb(result);
    });
}

module.exports = User;