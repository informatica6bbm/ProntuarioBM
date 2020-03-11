'use strict';
const Helpers = require("./../../helpers/helpers");

const Lts = require('./../models/Lts');
const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Lts.findAll({
        where: {
            id: id
        }
    }).then(response => {
        var lts = JSON.parse(JSON.stringify(response));
        res.status(200).json(lts);
    });
}

exports.getAll = (req, res, next) => {
    Lts.findAll().then(response => {
        var lts = JSON.parse(JSON.stringify(response));
        Pessoa.findAll().then(response => {
            var pessoas = JSON.parse(JSON.stringify(response));
            var ltsComNomes = [];
            lts.forEach(l => {
                pessoas.forEach(pessoa => {
                    if(pessoa.id == l.idPessoa){
                        l.paciente = pessoa.nome;
                        ltsComNomes.push(l);
                    }
                });
            });
            res.status(200).json(ltsComNomes);
        });

    });
}

exports.post = (req, res, next) => {
    var idPessoa = req.body.idPessoa;
    var tipoDocumento = req.body.tipoDocumento;
    var data = {
        idPessoa: idPessoa,
        tipoDocumento: tipoDocumento,
        createdAt: Helpers.getDataHoraAtual()
    };

    Lts.create(data).then(response => {
        res.status(200).json(response);
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPessoa = req.body.idPessoa;
    var tipoDocumento = req.body.tipoDocumento;

    var data = {
        idPessoa: idPessoa,
        tipoDocumento: tipoDocumento,
        createdAt: Helpers.getDataHoraAtual()
    };

    Lts.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Lts.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
