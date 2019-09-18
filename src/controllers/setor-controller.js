'use strict';
const Helpers = require("./../../helpers/helpers");
const Setor = require('./../models/Setor');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Setor.findAll().then(response => {
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
    Setor.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var setor = req.body.setor;
    var descricao = req.body.descricao;
    var data = {
        setor: setor,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Setor.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var setor = req.body.setor;
    var descricao = req.body.descricao;
    var idLocal = req.body.idLocal;

    var data = {
        setor: setor,
        descricao: descricao,
        idLocal: idLocal,
        createdAt: Helpers.getDataHoraAtual()
    };

    Setor.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Setor.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
