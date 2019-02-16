'use strict'

const ValidationContract = require('../validation/fluent-validator');
const respository = require('../repositories/product-repository');

exports.get = (request, response, next) => {
    respository.get()
        .then(data => {
            response.status(200).send(data);
        }).catch(e => {
            response.status(400).send(e);
        });
};

exports.getBySlug = (request, response, next) => {
    respository.getBySlug(request.params.slug)
        .then(data => {
            response.status(200).send(data);
        }).catch(e => {
            response.status(400).send(e);
        });
};

exports.getById = (request, response, next) => {
    respository.getById(request.params.id)
        .then(data => {
            response.status(200).send(data);
        }).catch(e => {
            response.status(400).send(e);
        });
};

exports.getByTag = (request, response, next) => {
    respository.getByTag(request.params.tag)
        .then(data => {
            response.status(200).send(data);
        }).catch(e => {
            response.status(400).send(e);
        });
};

exports.post = (request, response, next) => {

    var contract = new ValidationContract();
    contract.hasMinLen(request.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(request.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(request.body.description, 3, 'O description deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        response.status(400).send(contract.errors()).end();
        return;
    }   

    respository.create(request.body)
        .then(x => {
            response.status(201).send({ message: 'Produto cadastrado.' });
        }).catch(e => {
            response.status(400).send({ message: 'Falha ao cadatrar.', data: e });
        });
};

exports.put = (request, response, next) => {
    respository.update(request.params.id, request.body)
        .then(data => {
            response.status(200).send({ message: 'Atualizado' });
        }).catch(e => {
            response.status(400).send({ message: 'Falha ao atualizar.', data: e });
        });
};

exports.delete = (request, response, next) => {
    respository.delete(request.body.id)
        .then(data => {
            response.status(200).send({ message: 'Removido' });
        }).catch(e => {
            response.status(400).send({ message: 'Falha ao remover.', data: e });
        });
};