'use strict';

const Setor = require('./../models/Setor');

exports.get = (req, res, next) => {
    // const id = req.params.id;
    Setor.findAll().then(response => {
        res.status(200).json(response);
    });

}

exports.getAll = (req, res, next) => {
    // const id = req.params.id;
    Setor.findAll().then(response => {
        res.status(200).json(response);
    });

}
