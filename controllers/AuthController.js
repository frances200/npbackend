const dao = require('../dao/AuthDAO');
const userdao = require('../dao/UserDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;

    userdao.getUserByEmail(email)
        .then(user => {
            if (!user.rows[0]) {
                const error = new Error('A user with this email does not exist.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user.rows[0];
            return bcrypt.compare(password, loadedUser.password);
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({email: loadedUser.email, role:loadedUser.role, userid: loadedUser.id}, '3f5OnScjUv2gcTJ4PpsEHt9b1u7m2TDb', {expiresIn: '1h'}); //Generate token for client with an expire time of 1 hour.

            res.status(200).json({
                id: loadedUser.id,
                token: token,
                email: loadedUser.email,
                firstname: loadedUser.firstname,
                surname: loadedUser.surname,
                phone: loadedUser.phone,
                role: loadedUser.role
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
            message: 'Cannot create account.',
            errors: errors.array()
        });
    }

    const {body} = req;

    body.password = await bcrypt.hash(body.password, 12);

    dao.registerUser(body).then(() => {
        return res.status(200).json({
            message: 'User registered.'
        });
    }).catch(err => {
        if(!err.statusCode)
            err.statusCode = 500;
        next(err);
    })
}

exports.fetchTotalUserCount = (req, res, next) => {
    dao.fetchTotalUserCount().then(response => {
        res.status(200).json({
           message: response.rows[0].count
        });
    }).catch(err => {
        if(!err.statusCode)
            err.statusCode = 500;
        next(err);
    })
}
