'use strict';

const Escala = require('./../models/Escala');

exports.get = (req, res, next) => {
    // const id = req.params.id;
    Escala.findAll().then(response => {
        var find = "";
        var data = JSON.parse(JSON.stringify(response));
        for(var i = 0; i < data.length; i++){
            if(data[i].id == 1) {
                find = data[i] ;
                break;
            }
        }

        res.status(200).json(find);
    });

}

exports.getAll = (req, res, next) => {
    Escala.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}
