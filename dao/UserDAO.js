const db = require("../database/db");
const User = require("../models/User");

module.exports = class UserDAO {
    static getUserByEmail(email){
        return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    }
}
