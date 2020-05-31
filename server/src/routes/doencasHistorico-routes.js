'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/doencasHistorico-controller');

router.get('/:idHistoricoDoenca',  controller.getAll);
// router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
