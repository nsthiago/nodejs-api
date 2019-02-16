'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (requisicao, response, next) {
    var token = requisicao.body.token || requisicao.query.token || requisicao.headers['x-access-token'];

    if (!token) {
        response.status(401).json({
            message: 'Acesso Restrito'
        });
    }
    else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                response.status(401).json({
                    message: 'Token Inválido'
                });
            }
            else {
                next();
            }
        });
    }
}

exports.isAdmin = function (requisicao, response, next) {
    var token = requisicao.body.token || requisicao.query.token || requisicao.headers['x-access-token'];

    if (!token) {
        response.status(401).json({
            message: 'Token Inválido'
        });
    }
    else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                response.status(401).json({
                    message: 'Token Inválido'
                });
            }
            else {
                if (decoded.roles.includes('admin')) {
                    next();
                }
                else {
                    response.status(403).json({
                        message: 'Funcionalidade restrita para administradores'
                    });
                }
            }
        });
    }
}