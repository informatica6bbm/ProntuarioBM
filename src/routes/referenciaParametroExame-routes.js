'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/referenciaParametroExame-controller');

router.get('/',  controller.getAll);
router.get('/getByIdParametro/:id', controller.getByIdParametro);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
