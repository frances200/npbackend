// const TestModel = require('../models/TestModel');
 const dao = require('../dao/ProductDAO')

exports.fetchAllProducts = (req, res, next) => {
    dao.fetchAllProducts().then((products => {
        res.status(200).json({
           message: 'Fetched all products',
           products: products.rows
        });
    })).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.fetchProduct = (req, res, next) => {
    const id = req.params.id;
    dao.fetchProduct(id).then((products => {
        res.status(200).json({
            message: 'Fetched product ' + id,
            product: products.rows[0]
        });
    })).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.createProduct = (req, res, next) => {
    if(req.role === 'customer'){
        return res.status(401).json({
            message: 'Not authorized.'
        });
    }

    dao.createProduct(req.body).then(response => {
        res.status(200).json({
            message: response
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteProduct = (req, res, next) => {
    if(req.role === 'customer'){
        return res.status(401).json({
            message: 'Not authorized.'
        });
    }

    dao.deleteProduct(req.body.id).then(response => {
        res.status(200).json({
            message: response
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}
