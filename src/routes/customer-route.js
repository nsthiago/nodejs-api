'use strict';

const express = require('express');
const router = express.Router();
const controllerAsync = require('../controllers/customerController');
const authService = require('../services/auth-services');

router.post('/', controllerAsync.post);
router.post('/authenticate', controllerAsync.authenticate);
router.post('/refresh-token', authService.authorize, controllerAsync.refreshToken);

module.exports = router;