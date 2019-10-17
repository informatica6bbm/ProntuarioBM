'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/resultadoParametroExame-controller');

router.get('/',  controller.getAll);
router.get('/:id',  controller.get);
router.get('/getByIdResultadoExame/:id',  controller.getByIdResultadoExame);
router.post('/:idResultadoExame',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
