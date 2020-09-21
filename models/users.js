const connection = require("./db.js");

// constructor
const User ={};

User.getAllUsers = (res) => {
    connection.query("SELECT * FROM Users", (err, result) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.send(result);
    });
}

module.exports = User;