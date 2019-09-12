'use strict';

const Hierarquia = require('./../models/Hierarquia');

exports.get = (req, res, next) => {
    // const id = req.params.id;
    Hierarquia.findAll().then(response => {
        res.status(200).json(response);
    });

}

exports.getAll = (req, res, next) => {
    // const id = req.params.id;
    Hierarquia.findAll().then(response => {
        res.status(200).json(response);
    });

}
