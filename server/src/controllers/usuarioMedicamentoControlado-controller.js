'use strict';
const Helpers = require("./../../helpers/helpers");
const UsuarioMedicamentoControlado = require('./../models/UsuarioMedicamentoControlado');
const Pessoa = require('./../models/Pessoa');

exports.get = (req, res, next) => {
    const id = req.params.id;
    UsuarioMedicamentoControlado.findAll().then(response => {
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
    Pessoa.findAll().then(response => {
        var pessoas = JSON.parse(JSON.stringify(response));
        UsuarioMedicamentoControlado.findAll().then(response => {
            var pessoasHistorico = JSON.parse(JSON.stringify(response));
            var historico = [];

            for(var i = 0; i < pessoasHistorico.length; i++){
                for(var k = 0; k < pessoas.length; k++) {
                    if(pessoas[k].id == pessoasHistorico[i].idPessoa) {
                        pessoasHistorico[i].paciente = pessoas[k].nome;
                    }
                }
            }
            res.status(200).json(pessoasHistorico);
        });
    });
}

exports.post = (req, res, next) => {
    var idPessoa = req.body.idPessoa;
    var data = {
        idPessoa: idPessoa,
        createdAt: Helpers.getDataHoraAtual()
    };

    UsuarioMedicamentoControlado.create(data).then(response => {

        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var idPessoa = req.body.idPessoa;
    var data = {
        idPessoa: idPessoa,
        updatedAt: Helpers.getDataHoraAtual()
    };

    UsuarioMedicamentoControlado.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    UsuarioMedicamentoControlado.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
