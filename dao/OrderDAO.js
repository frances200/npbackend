const db = require('../database/db');

module.exports = class OrderDAO {
    static fetchAllOrders() {
        return db.query('SELECT * FROM orders');
    }

    static fetchOrder(id) {
        return db.query('SELECT * FROM orders WHERE id = $1', [id]);
    }

    static createOrder(body) {
        const { userID, status } = body;
        return db.query(`SELECT createOrder($1, $2)`, [userID, status]);
    }

    static createOrderItem(orderID, product) {
        return db.query(`SELECT createOrderItem($1::integer, $2::integer)`, [orderID, product])
    }

    static fetchUserOrders(userid) {
        return db.query(`SELECT * FROM orders WHERE userid = $1`, [userid]);
    }

    static fetchAllUserOrdersInfo(orderid) {
        return db.query(
            `SELECT p.* ` +
            `FROM orders `+
            `FULL JOIN orderitems ON orders.id = orderitems.orderid `+
            `FULL JOIN products as p ON orderitems.productid = p.id ` +
            `WHERE orders.id = $1 `, [orderid]);
    }

    static getTotalOrderCount() {
        return db.query(`SELECT count(*) as "orders" FROM orders`);
    }
}
