'use strict';
const Helpers = require("./../../helpers/helpers");
const MedicamentoControlado = require('./../models/MedicamentoControlado');

exports.get = (req, res, next) => {
    const id = req.params.id;
    MedicamentoControlado.findAll().then(response => {
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
    const idUSuarioMedicamentoControlado = req.params.idUSuarioMedicamentoControlado;
    MedicamentoControlado.findAll({
        where: {
            idUSuarioMedicamentoControlado: idUSuarioMedicamentoControlado
        }
    }).then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.post = (req, res, next) => {
    var idUSuarioMedicamentoControlado = req.body.idUSuarioMedicamentoControlado;
    var medicamento = req.body.medicamento;
    var tipo = req.body.tipo;
    var data = {
        idUSuarioMedicamentoControlado: idUSuarioMedicamentoControlado,
        medicamento: medicamento,
        tipo: tipo,
        createdAt: Helpers.getDataHoraAtual()
    };

    MedicamentoControlado.create(data).then(response => {

        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var escala = req.body.escala;
    var data = {
        escala: escala,
        updatedAt: Helpers.getDataHoraAtual()
    };

    MedicamentoControlado.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    MedicamentoControlado.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
