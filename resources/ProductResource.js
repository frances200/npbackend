const express = require('express');

const productController = require('../controllers/ProductController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Routes
router.get('/', productController.fetchAllProducts);
router.get('/:id', productController.fetchProduct);
router.post('/manage/create', isAuth, productController.createProduct);
router.post('/manage/delete', isAuth, productController.deleteProduct);

module.exports = router;
