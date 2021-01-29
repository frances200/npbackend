const express = require('express');

const orderController = require('../controllers/OrderController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Routes
router.get('/', isAuth, orderController.fetchAllOrders);
router.get('/:id', isAuth, orderController.fetchOrder);
router.get('/count/total', isAuth, orderController.fetchTotalOrderCount);
router.get('/fetch/user', isAuth, orderController.fetchUserOrders);
router.post('/manage/create', isAuth, orderController.createOrder);

module.exports = router;
