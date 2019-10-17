'use strict';
const Helpers = require("./../../helpers/helpers");
const ResultadoParametroExame = require('./../models/ResultadoParametroExame');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ResultadoParametroExame.findAll().then(response => {
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
    ResultadoParametroExame.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.getByIdResultadoExame = (req, res, next) => {
    const id = req.params.id;

    ResultadoParametroExame.findAll().then(response => {
        var find = [];
        var data = JSON.parse(JSON.stringify(response));
        console.log(data);
        for(var i = 0; i < data.length; i++){
            if(data[i].idExame == id) {
                find.push(data[i]);
            }
        }

        res.status(200).json(find);
    });
}

exports.post = (req, res, next) => {
    var data = req.body.data;
    var valor = req.body.valor
    var idPessoa = req.body.idPessoa;
    var idExame = req.body.idExame;
    var idParametro = req.body.idParametro;
    var idResultadoExame = req.params.idResultadoExame;

    var data = {
        idResultadoExame: idResultadoExame,
        valor: valor,
        idParametro: idParametro,
        idExame: idExame,
        createdAt: Helpers.getDataHoraAtual()
    };
    
    ResultadoParametroExame.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var data = req.body.data;
    var valor = req.body.valor
    var idPessoa = req.body.idPessoa;
    var idExame = req.body.idExame;
    var idParametro = req.body.idParametro;

    var data = {
        data: data,
        valor: valor,
        idPessoa: idPessoa,
        idExame: idExame,
        idParametro: idParametro,
        createdAt: Helpers.getDataHoraAtual()
    };

    ResultadoParametroExame.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ResultadoParametroExame.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
