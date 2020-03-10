'use strict';
const Helpers = require("./../../helpers/helpers");

const Batalhao = require('./../models/Batalhao');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Batalhao.findAll().then(response => {
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
    Batalhao.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var abreviacao = req.body.abreviacao;
    var descricao = req.body.descricao;
    var data = {
        abreviacao: abreviacao,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Batalhao.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var abreviacao = req.body.abreviacao;
    var descricao = req.body.descricao;
    
    var data = {
        abreviacao: abreviacao,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Batalhao.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Batalhao.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
