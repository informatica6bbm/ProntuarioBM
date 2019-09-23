'use strict';
const Helpers = require("./../../helpers/helpers");
const ReferenciaParametroExame = require('./../models/ReferenciaParametroExame');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ReferenciaParametroExame.findAll().then(response => {
        var find = "";
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

exports.getByIdParametro = (req, res, next) => {
    const id = req.params.id;
    ReferenciaParametroExame.findAll().then(response => {
        var find = [];
        var counter = 0;
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].idParametro == id) {
                find[counter] = data[i] ;
                counter++;
            }
        }

        res.status(200).json(find);
    });
}

exports.getAll = (req, res, next) => {
    ReferenciaParametroExame.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var comparacao = req.body.comparacao;
    var idade = req.body.idade
    var idadeMinima = req.body.idadeMinima;
    var idadeMaxima = req.body.idadeMaxima;
    var valorMinima = req.body.valorMinimo;
    var valorMaximo = req.body.valorMaximo;
    var sexo = req.body.sexo;
    var idParametro = req.body.idParametro;

    var data = {
        comparacao: comparacao,
        idade: idade,
        idadeMinima: idadeMinima,
        idadeMaxima: idadeMaxima,
        valorMinima: valorMinima,
        valorMaximo: valorMaximo,
        sexo: sexo,
        idParametro: idParametro,
        createdAt: Helpers.getDataHoraAtual()
    };

    ReferenciaParametroExame.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var comparacao = req.body.comparacao;
    var idade = req.body.idade
    var idadeMinima = req.body.idadeMinima;
    var idadeMaxima = req.body.idadeMaxima;
    var valorMinima = req.body.valorMinimo;
    var valorMaximo = req.body.valorMaximo;
    var sexo = req.body.sexo;
    var idParametro = req.body.idParametro;

    var data = {
        comparacao: parametro,
        idade: idade,
        idadeMinima: idadeMinima,
        idadeMaxima: idadeMaxima,
        valorMinima: valorMinima,
        valorMaximo: valorMaximo,
        sexo: sexo,
        idParametro: idParametro,
        createdAt: Helpers.getDataHoraAtual()
    };

    ReferenciaParametroExame.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ReferenciaParametroExame.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
