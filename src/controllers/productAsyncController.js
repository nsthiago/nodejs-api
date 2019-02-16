'use strict'

const ValidationContract = require('../validation/fluent-validator');
const respository = require('../repositories/product-AsyncRepository');

exports.get = async (request, response, next) => {
    try {
        var data = await respository.get();
        response.status(200).send(data);

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.getBySlug = async (request, response, next) => {

    try {
        var data = await respository.getBySlug(request.params.slug);
        response.status(200).send(data);

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.getById = async (request, response, next) => {
    try {
        var data = await respository.getById(request.params.id);
        response.status(200).send(data);

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.getByTag = async (request, response, next) => {
    try {
        var data = await respository.getByTag(request.params.tag);
        response.status(200).send(data);

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.post = async (request, response, next) => {
    try {
        var contract = new ValidationContract();
        contract.hasMinLen(request.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(request.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
        contract.hasMinLen(request.body.description, 3, 'O description deve conter pelo menos 3 caracteres');

        if (!contract.isValid()) {
            response.status(400).send(contract.errors()).end();
            return;
        }

        await respository.create(request.body);
        response.status(201).send({ message: 'Produto cadastrado.' });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.put = async (request, response, next) => {
    try {
        await respository.update(request.params.id, request.body);
        response.status(200).send({ message: 'Atualizado' });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};

exports.delete = async (request, response, next) => {
    try {
        await respository.delete(request.body.id);
        response.status(200).send({ message: 'Removido' });

    } catch (e) {
        response.status(500).send({ message: 'Falha ao processar requisição' });
    }
};