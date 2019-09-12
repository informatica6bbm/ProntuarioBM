'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/escala-controller');

router.get('/:id', controller.get);
router.get('/all', controller.getAll);

module.exports = router;
