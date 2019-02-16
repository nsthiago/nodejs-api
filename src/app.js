const express = require('express');
const bodyParser = require('body-parser');
const monogoose = require('mongoose');
const config = require('./config');
const app = express();

//BD
monogoose.connect(config.connectionString);

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');


//rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const productsAsyncRoute = require('./routes/productsAsync-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (requisicao, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, x-access-token');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS', );
    next();
});


app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/products-async', productsAsyncRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;