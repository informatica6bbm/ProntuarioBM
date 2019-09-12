'use strict';

const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const Pessoa = require('./../models/Pessoa');
    // const id = req.params.id;
    Pessoa.findAll().then(response => {
        res.status(200).json(response);
    });

}
