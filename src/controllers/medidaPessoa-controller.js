'use strict';
const Helpers = require("./../../helpers/helpers");
const MedidaPessoa = require('./../models/MedidaPessoa');

exports.get = (req, res, next) => {
    const id = req.params.id;
    MedidaPessoa.findAll().then(response => {
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
    MedidaPessoa.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var circunferenciaAbdominal = req.body.circunferenciaAbdominal;
    var peso = req.body.peso;
    var pressaoArterialSistolica = req.body.pressaoArterialSistolica;
    var pressaoArterialDiastolica = req.body.pressaoArterialDiastolica;
    var idPessoa = req.body.idPessoa;

    var data = {
        circunferenciaAbdominal: circunferenciaAbdominal,
        peso: peso,
        pressaoArterialSistolica: pressaoArterialSistolica,
        pressaoArterialDiastolica: pressaoArterialDiastolica,
        idPessoa : idPessoa,
        createdAt: Helpers.getDataHoraAtual()
    };

    MedidaPessoa.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var circunferenciaAbdominal = req.body.circunferenciaAbdominal;
    var peso = req.body.peso;
    var pressaoArterialSistolica = req.body.pressaoArterialSistolica;
    var pressaoArterialDiastolica = req.body.pressaoArterialDiastolica;
    var idPessoa = req.body.idPessoa;

    var data = {
        circunferenciaAbdominal: circunferenciaAbdominal,
        peso: peso,
        pressaoArterialSistolica: pressaoArterialSistolica,
        pressaoArterialDiastolica: pressaoArterialDiastolica,
        idPessoa : idPessoa,
        createdAt: Helpers.getDataHoraAtual()
    };

    MedidaPessoa.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    MedidaPessoa.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
