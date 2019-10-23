'use strict';
const Helpers = require("./../../helpers/helpers");
const Login = require('./../models/Login');
const Pessoa = require('./../models/Pessoa');
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

    var token = Helpers.generateToken();
    console.log(token);

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
                        }else {
                            res.status(200).json({
                                response: false,
                                mensage: 'Usuário ou senha incorreto!'
                            });
                        }
                    });
                }else {
                    res.status(200).json({
                        response: false,
                        mensage: 'Ocorreu um erro durante o login!'
                    });
                }
            });
        }else {
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

            console.log(logins[i].createdAt);
            var dataSessao = new Date(logins[i].createdAt);
            var horaInicioSessao = dataSessao.getUTCHours();
            var minutosInicioSessao = dataSessao.getUTCMinutes();

            var dataAtual = new Date();
            var horaAtual = dataAtual.getHours();
            var minutosAtual = dataAtual.getMinutes();

            var tempoLogadoMinutos = ((horaAtual - horaInicioSessao) * 60) + ((minutosAtual - minutosInicioSessao) < 0 ? (minutosAtual - minutosInicioSessao) * -1 : minutosAtual - minutosInicioSessao)
            console.log(tempoLogadoMinutos);

            if(token.localeCompare(logins[i].token) == 0 && logins[i].sessaoValida == true) {

                resposta = true;
                break;
            }
        }
        console.log(resposta);
        res.status(200).json(resposta);
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
