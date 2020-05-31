'use strict';
const Helpers = require("./../../helpers/helpers");
const DoencasHistorico = require('./../models/DoencasHistorico');

exports.get = (req, res, next) => {
    const id = req.params.id;
    DoencasHistorico.findAll().then(response => {
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
    const idHistoricoDoenca = req.params.idHistoricoDoenca;
    DoencasHistorico.findAll({
        where: {
            idHistoricoDoenca: idHistoricoDoenca
        }
    }).then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idHistoricoDoenca = req.body.idHistoricoDoenca;
    var doenca = req.body.doenca;
    var tipo = req.body.tipo;
    var data = {
        idHistoricoDoenca: idHistoricoDoenca,
        doenca: doenca,
        tipo: tipo,
        createdAt: Helpers.getDataHoraAtual()
    };

    DoencasHistorico.create(data).then(response => {

        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var idHistoricoDoenca = req.body.idHistoricoDoenca;
    var doenca = req.body.doenca;
    var tipo = req.body.tipo;
    var data = {
        idHistoricoDoenca: idHistoricoDoenca,
        doenca: doenca,
        tipo: tipo,
        createdAt: Helpers.getDataHoraAtual()
    };

    DoencasHistorico.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    DoencasHistorico.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
