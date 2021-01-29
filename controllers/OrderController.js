// const TestModel = require('../models/TestModel');
 const dao = require('../dao/OrderDAO');

exports.fetchAllOrders = (req, res, next) => {
    dao.fetchAllOrders().then((orders => {
        res.status(200).json({
            message: 'Fetched all products',
            products: orders.rows
        });
    })).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.fetchOrder = (req, res, next) => {
    const id = req.params.id;
    dao.fetchOrder(id).then((order => {
        res.status(200).json({
            message: 'Fetched order '+ id,
            product: order.rows[0]
        });
    })).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.fetchUserOrders = (req, res, next) => {
    const id = req.userid;
    let ordersList = [];
    dao.fetchUserOrders(id).then((async orders => {
        for(let i in orders.rows){
            ordersList.push(orders.rows[i]);
            await dao.fetchAllUserOrdersInfo(orders.rows[i].id).then(products => {
                ordersList[i].products = products.rows;
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        }
        res.status(200).json({
            message: 'Fetched orders from user ' + id,
            orders: ordersList
        });
    })).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.fetchTotalOrderCount = (req, res, next) => {
    dao.getTotalOrderCount().then(response => {
        res.status(200).json({
           message: 'Fetched total orders count',
           orders: response.rows[0].orders
        });
    });
}

exports.createOrder = (req, res, next) => {
    const body = req.body;
    dao.createOrder(body).then(async response => {
        const orderID = response.rows[0].createorder;
        let i;
        for(i in body.products){
            const product = body.products[i];
            await dao.createOrderItem(orderID, product.id).then().catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
        }
        res.status(200).json({
            message: 'Created order '+orderID,
            response: response
        });
    })
}
