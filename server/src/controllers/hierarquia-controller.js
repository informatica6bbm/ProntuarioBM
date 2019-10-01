'use strict';
const Helpers = require("./../../helpers/helpers");
const Hierarquia = require('./../models/Hierarquia');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Hierarquia.findAll().then(response => {
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
    Hierarquia.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var hierarquia = req.body.hierarquia;
    var descricao = req.body.descricao;
    var data = {
        hierarquia: hierarquia,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Hierarquia.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var hierarquia = req.body.hierarquia;
    var descricao = req.body.descricao;

    var data = {
        hierarquia: hierarquia,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Hierarquia.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Hierarquia.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
