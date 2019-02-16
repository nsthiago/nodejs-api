'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    var response = await  Order
    .find({},'number status')
    .populate('customer','name')
    .populate('items.product', 'title description');
    
    return response;
};

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
};

