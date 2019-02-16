'use strict'

const ValidationContract = require('../validation/fluent-validator');
const respository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-services');
const authService = require('../services/auth-services');

exports.post = async (request, response, next) => {
    try {
        var contract = new ValidationContract();
        contract.hasMinLen(request.body.name, 3, 'O name deve conter pelo menos 3 caracteres');
        contract.isEmail(request.body.email, 'Email inválido');
        contract.hasMinLen(request.body.password, 6, 'O password deve conter pelo menos 3 caracteres');


        if (!contract.isValid()) {
            response.status(400).send(contract.errors()).end();
            return;
        }

        await respository.create({
            name: request.body.name,
            email: request.body.email,
            password: md5(request.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        //emailService.send(request.body.email, 'Envio de Email com Sendgrid', global.EMAIL_TMPL.replace('{0}',request.body.name))

        response.status(201).send({ message: 'Cliente cadastrado.' });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição', ex: e });
    }
};



exports.authenticate = async (request, response, next) => {
    try {
        const customer = await respository.authenticate({
            email: request.body.email,
            password: md5(request.body.password + global.SALT_KEY)
        });

        if (!customer) {
            response.status(404).send({
                message: 'Usuario ou senha invalidos',
            });
            return;
        }

        var token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        response.status(201).send({
            token: token,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name
            }
        });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição', ex: e });
    }
};


exports.refreshToken = async (request, response, next) => {
    try {


        var token = request.body.token || request.query.token || request.headers['x-access-token'];
        var data = await authService.decodeToken(token);

        const customer = await respository.getById(data.id);

        if (!customer) {
            response.status(404).send({
                message: 'Cliente nao encontrado',
            });
            return;
        }

        var tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        response.status(201).send({
            token: tokenData,
            data: {
                id: customer._id,
                email: customer.email,
                name: customer.name
            }
        });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição', ex: e });
    }
};