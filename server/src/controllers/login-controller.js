'use strict';
const Helpers = require("./../../helpers/helpers");
const Login = require('./../models/Login');
const Sha256 = require('js-sha256');
const axios = require('axios');

exports.get = (req, res, next) => {
    // const id = req.params.id;
    // Batalhao.findAll().then(response => {
    //     var find = [];
    //     var data = JSON.parse(JSON.stringify(response));
    //     for(var i = 0; i < data.length; i++){
    //         if(data[i].id == id) {
    //             find = data[i] ;
    //             break;
    //         }
    //     }
    //
    //     res.status(200).json(find);
    // });
}

exports.post = (req, res, next) => {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var token = Sha256(senha);

    var data = {
        usuario: usuario,
        token: token,
        sessaoValida: true,
        createdAt: Helpers.getDataHoraAtual()
    };

    Login.create(data).then(response => {
        if(response){
            axios.get('http://localhost:9000?usuario=' + usuario + '&passwd=' + senha).then(response => {
                if(response.data){
                    res.status(200).json(token);
                }else {
                    res.status(200).json(false);
                }
            });
        }else {
            res.status(200).json(false);
        }
    });
}

exports.validToken = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0;
        for(i in logins) {
            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {
                res.status(200).json(true);
            }else {
                res.status(200).json(false);
            }
        }
    });
}

exports.loginoff = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0;
        for(i in logins) {
            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {
                var data = {
                    sessaoValida: false
                };
                Login.update(data, {
                    where: {
                        id: logins[i].id
                    }
                });

                res.status(200).json(true);
            }else {
                res.status(200).json(false);
            }
        }
    });
}

exports.update = (req, res, next) => {
    var id = req.body.id;
    var abreviacao = req.body.abreviacao;
    var descricao = req.body.descricao;

    var data = {
        abreviacao: abreviacao,
        descricao: descricao,
        createdAt: Helpers.getDataHoraAtual()
    };

    Login.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
