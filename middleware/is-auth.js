const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, '3f5OnScjUv2gcTJ4PpsEHt9b1u7m2TDb');
    }catch(error){
        error.statusCode = 500;
        throw error;
    }
    if(!decodedToken){
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw error;
    }
    req.email = decodedToken.email;
    req.role = decodedToken.role;
    req.userid = decodedToken.userid;
    next();
};
