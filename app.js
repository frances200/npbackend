const express = require('express');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');

const port = 3000;

const app = express();
app.use(bodyParser.json());

//Resources
const productResource = require('./resources/ProductResource');
const authResource = require('./resources/AuthResource');
const orderResource = require('./resources/OrderResource');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');                              // Allow client to send requests from given origin, * serving as a wildcard
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow client to use given request methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, userID');   // Allow client to send request headers
    next();
});

//Routes
 app.use('/products', productResource);
 app.use('/auth', authResource);
 app.use('/orders', orderResource);

app.listen(port);
