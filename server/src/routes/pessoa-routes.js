'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/pessoa-controller');

router.get('/',  controller.getAll);
router.get('/:id',  controller.get);
router.post('/getPorNomeUsuario', controller.getUsername);
router.post('/',    controller.post);
router.post('/importaPessoas', controller.importaPessoas);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
