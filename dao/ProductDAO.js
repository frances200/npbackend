const db = require('../database/db');

module.exports = class ProductDAO {
    static fetchAllProducts() {
        return db.query('SELECT * FROM products');
    }

    static fetchProduct(id) {
        return db.query('SELECT * FROM products WHERE id = $1', [id]);
    }

    static createProduct(body) {
        const { title, description, price, stock, imageurl } = body;
        return db.query(`SELECT createProduct($1, $2, $3, $4, $5)`, [title, description, price, stock, imageurl]);
    }

    static deleteProduct(id) {
        return db.query(`DELETE FROM products WHERE id = $1`, [id]);
    }
}
