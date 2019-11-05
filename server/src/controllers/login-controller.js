'use strict';
const Helpers = require("./../../helpers/helpers");
const Login = require('./../models/Login');
const Pessoa = require('./../models/Pessoa');
const Sha256 = require('js-sha256');
const axios = require('axios');

exports.post = (req, res, next) => {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var token = Helpers.generateToken();

    var data = {
        usuario: usuario,
        token: token,
        sessaoValida: true,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.findAll().then(response => {
        var pessoas = response;
        var i = 0, existeUsuario = false;
        for(i in pessoas){
            if(pessoas[i].usuario === usuario){
                existeUsuario = true;
                break;
            }
        }

        if(existeUsuario) {
            Login.create(data).then(response => {
                if(response){
                    axios.get('http://localhost:9000?usuario=' + usuario + '&' + 'passwd=' + senha).then(response => {
                        if(response.data){
                            res.status(200).json({
                                response: true,
                                mensage: 'Login realizado com sucesso!',
                                token: token
                            });
                        }

                        if(!response.data) {
                            res.status(200).json({
                                response: false,
                                mensage: 'Usuário ou senha incorreto!'
                            });
                        }
                    });
                }

                if(!response){
                    res.status(200).json({
                        response: false,
                        mensage: 'Ocorreu um erro durante o login!'
                    });
                }
            });
        }

        if(!existeUsuario) {
            res.status(200).json({
                response: false,
                mensage: 'Usuário não cadastrado!'
            });
        }

    });
}

exports.validToken = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0, resposta = false;
        for(i in logins) {
            var segundos = Helpers.calculaSegundosSessao(logins[i].createdAt);

            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {
                resposta = true;
                segundos.then(response => {
                    if(response > 7200){
                        resposta = false;
                        revogaSessao(logins[i].id);
                    }
                })

                break;
            }
        }
        res.status(200).json(resposta);
    });

    async function revogaSessao(id) {
        var data = {
            sessaoValida: false,
        };

        Login.update(data, {
            where: {
                id: id
            }
        });
    }
}

exports.loginoff = (req, res, next) => {
    var token = req.body.token;

    Login.findAll().then(response => {
        var logins = response;
        var i = 0;
        var resposta = false;
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

                resposta = false;
            }else {

            }
        }

        res.status(200).json(resposta);
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
