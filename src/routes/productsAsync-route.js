'use strict';

const express = require('express');
const router = express.Router();
const controllerAsync = require('../controllers/productAsyncController');
const authService = require('../services/auth-services');

router.get('/', controllerAsync.get);
router.get('/:slug', controllerAsync.getBySlug);
router.get('/admin/:id', controllerAsync.getById);
router.get('/tags/:tag', controllerAsync.getByTag);
router.post('/', authService.isAdmin, controllerAsync.post);
router.put('/:id', authService.isAdmin, controllerAsync.put);
router.delete('/', authService.isAdmin, controllerAsync.delete);

module.exports = router;