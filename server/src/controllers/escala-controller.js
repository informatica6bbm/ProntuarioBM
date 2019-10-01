'use strict';
const Helpers = require("./../../helpers/helpers");
const Escala = require('./../models/Escala');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Escala.findAll().then(response => {
        var find = [];
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].id == id) {
                find = data[i] ;
                break;
            }
        }

        res.status(200).json(find);
    });

}

exports.getAll = (req, res, next) => {
    Escala.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var escala = req.body.escala;
    var data = {
        escala: escala,
        createdAt: Helpers.getDataHoraAtual()
    };

    Escala.create(data).then(response => {

        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var escala = req.body.escala;
    var data = {
        escala: escala,
        updatedAt: Helpers.getDataHoraAtual()
    };

    Escala.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Escala.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
