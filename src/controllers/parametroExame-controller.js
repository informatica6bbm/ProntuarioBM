'use strict';
const Helpers = require("./../../helpers/helpers");
const ParametroExame = require('./../models/ParametroExame');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ParametroExame.findAll().then(response => {
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
    ParametroExame.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var parametro = req.body.parametro;
    var unidadeMedida = req.body.unidadeMedida;

    var data = {
        parametro: parametro,
        unidadeMedida: unidadeMedida,
        createdAt: Helpers.getDataHoraAtual()
    };

    ParametroExame.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var parametro = req.body.parametro;
    var unidadeMedida = req.body.unidadeMedida;

    var data = {
        parametro: parametro,
        unidadeMedida: unidadeMedida,
        createdAt: Helpers.getDataHoraAtual()
    };
    
    ParametroExame.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ParametroExame.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
