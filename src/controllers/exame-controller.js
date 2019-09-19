'use strict';
const Helpers = require("./../../helpers/helpers");
const Exame = require('./../models/Exame');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Exame.findAll().then(response => {
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
    Exame.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var exame = req.body.exame;
    var descricao = req.body.descricao;

    var data = {
        exame: exame,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Exame.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var exame = req.body.exame;
    var descricao = req.body.descricao;

    var data = {
        exame: exame,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Exame.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Exame.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
