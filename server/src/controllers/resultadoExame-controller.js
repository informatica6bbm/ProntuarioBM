'use strict';
const Helpers = require("./../../helpers/helpers");
const ResultadoExame = require('./../models/ResultadoExame');
const ResultadoParametroExame = require('./../models/ResultadoParametroExame');

const Pessoa = require('./../models/Pessoa');


const Exame = require('./../models/Exame');
const ParametroExame = require('./../models/ParametroExame');

exports.get = (req, res, next) => {
    const id = req.params.id;
    ResultadoExame.findAll().then(response => {
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
    var item = {
        nome: "",
        idPessoa: "",
        data: "",
        exame: "",
        idExame: null,
        parametros: []
    };

    var itemDefault = {
        nome: "",
        idPessoa: "",
        data: "",
        exame: "",
        idExame: null,
        parametros: []
    };

    var parametro = {
        id: null,
        parametro: "",
        valor: ""
    };

    var parametroDefault = {
        id: null,
        parametro: "",
        valor: ""
    };

    ResultadoExame.findAll().then(response => {
        var resultados = response;
        ResultadoParametroExame.findAll().then(response => {
            var resultadoParametroExame = response;

            Exame.findAll().then(response => {
                var exames = response;
                ParametroExame.findAll().then(response => {
                    var parametros = response;
                    Pessoa.findAll().then(response => {
                        var pessoas = response;
                        var resultadosExames = [];
                        var i = 0;
                        var j = 0;
                        var k = 0;
                        for(i in resultados){
                            item.data = Helpers.formatDate(resultados[i].data);

                            for(j in exames){
                                if(exames[j].id == resultados[i].idExame){
                                    item.idExame = exames[j].id;
                                    item.exame = exames[j].exame;
                                    break;
                                }
                            }
                            j = 0;
                            for(j in pessoas){
                                if(pessoas[j].id == resultados[i].idPessoa) {
                                    item.nome = pessoas[j].nome;
                                    item.idPessoa  = pessoas[j].id;
                                }
                            }
                            j = 0;

                            for(j in resultadoParametroExame){
                                if(resultadoParametroExame[j].idResultadoExame == resultados[i].id && resultadoParametroExame[j].idExame ==  resultados[i].idExame) {
                                    for(k in parametros){
                                        if(parametros[k].id == resultadoParametroExame[j].idParametro) {
                                            parametro.id =  resultadoParametroExame[j].idParametro;
                                            parametro.parametro = parametros[k].parametro;
                                            parametro.valor = resultadoParametroExame[j].valor;
                                            break;
                                        }
                                    };
                                    item.parametros.push(parametro);
                                    parametro = parametroDefault;
                                }
                            }

                            resultadosExames.push(item);
                            item = itemDefault;
                            parametro = parametroDefault;
                        }

                        res.status(200).json(resultadosExames);
                    });
                });
            });
        });


    });
}

exports.post = (req, res, next) => {
    var data = req.body.data;
    var valor = req.body.valor
    var idPessoa = req.body.idPessoa;
    var idExame = req.body.idExame;
    var idParametro = req.body.idParametro;

    var data = {
        data: data,
        valor: valor,
        idPessoa: idPessoa,
        idExame: idExame,
        idParametro: idParametro,
        createdAt: Helpers.getDataHoraAtual()
    };

    ResultadoExame.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var data = req.body.data;
    var valor = req.body.valor
    var idPessoa = req.body.idPessoa;
    var idExame = req.body.idExame;
    var idParametro = req.body.idParametro;

    var data = {
        data: data,
        valor: valor,
        idPessoa: idPessoa,
        idExame: idExame,
        idParametro: idParametro,
        createdAt: Helpers.getDataHoraAtual()
    };

    ResultadoExame.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    ResultadoExame.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}
