module.exports = class User {
    constructor(id, email, password, firstname, surname, phone, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.phone = phone;
        this.role = role;
    }

    getID() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }
}
