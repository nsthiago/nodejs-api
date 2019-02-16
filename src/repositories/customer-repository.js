'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.authenticate = async (data) => {
    var response = await  Customer
    .findOne({
        email: data.email, 
        password:data.password
    });
    return response;
};

exports.getById = async (id) => {
    var response = await  Customer
    .findById(id);
    return response;
};