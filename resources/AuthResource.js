const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const authController = require('../controllers/AuthController');
const userDAO = require('../dao/UserDAO');

const router = express.Router();

//Routes
router.get('/count/total', authController.fetchTotalUserCount)
router.post('/login', authController.login);
router.post('/register',[
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Enter a valid email')
        .custom((value, {req}) => {
            return userDAO.getUserByEmail(value).then(user => {
                if(user.rows[0]) {
                    return Promise.reject('This email already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password').trim().isLength({min: 5})
], authController.register);

module.exports = router;
