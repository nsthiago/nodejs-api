'use strict'

const ValidationContract = require('../validation/fluent-validator');
const respository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-services');


exports.post = async (request, response, next) => {

    var token = request.body.token || request.query.token || request.headers['x-access-token'];
    var data = await authService.decodeToken(token);

    var data = {
        customer: data.id,
        items: request.body.items,
        number: guid.raw().substr(0, 6),
    }

    try {
        await respository.create(data);
        response.status(201).send({ message: 'Pedido cadastrado.' });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição', ex: e.message });
    }
};


exports.get = async (request, response, next) => {
    try {
        var data = await respository.get();
        response.status(200).send(data);

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição', ex: e.message });
    }
};