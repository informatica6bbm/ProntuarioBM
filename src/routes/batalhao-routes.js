'use strict';

const Batalhao = require('./../models/Batalhao');

exports.get = (req, res, next) => {
    // const id = req.params.id;
    Batalhao.findAll().then(response => {
        res.status(200).json(response);
    });

}

exports.getAll = (req, res, next) => {
    // const id = req.params.id;
    Batalhao.findAll().then(response => {
        res.status(200).json(response);
    });

}
