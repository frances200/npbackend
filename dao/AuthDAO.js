const db = require('../database/db');

module.exports = class AuthDAO {
    static registerUser(body) {
        const {email, password, firstname, surname, phone, role} = body;
        return db.query('SELECT createUser($1, $2, $3, $4, $5, $6)',
            [email, password, firstname, surname, phone, role]);
    }

    static fetchTotalUserCount() {
        return db.query(`SELECT COUNT(*) FROM users`);
    }
}
