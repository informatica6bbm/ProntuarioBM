'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/resultadoExame-controller');

router.get('/',  controller.getAll);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.post('/importarResultado', controller.importaResultadosExames);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
