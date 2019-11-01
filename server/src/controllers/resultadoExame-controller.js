'use strict';
const Helpers = require("./../../helpers/helpers");

const Exame = require('./../models/Exame');
const Pessoa = require('./../models/Pessoa');
const ResultadoExame = require('./../models/ResultadoExame');
const ResultadoParametroExame = require('./../models/ResultadoParametroExame');
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
    var resultadoParametros = req.body.resultadoParametros;

    var data = {
        data: data.split("/").reverse().join('-') + " 00:00:00",
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

exports.importaResultadosExames = (req, res, next) => {
    const resultados = req.body.resultados;
    const cabecalho = resultados[1];
    const numeroColunaMatricula = Helpers.getNumeroColuna('MATRÍCULA',cabecalho);
    const numeroColunaDataExame = Helpers.getNumeroColuna('DATA_ATENDIMENTO',cabecalho);
    Exame.findAll().then(response => {
        var exames = response;
        ParametroExame.findAll().then(response => {
            var parametros = response;

            Pessoa.findAll().then(response => {
                const pessoas = response;

                for(var counterParametros in parametros){
                    var numeroColunaParametro = null;

                    for(var counterPosicaCabecalho in cabecalho){
                        if(parametros[counterParametros].parametro === cabecalho[counterPosicaCabecalho]) {
                            numeroColunaParametro = counterPosicaCabecalho;
                            break;
                        }
                    }

                    if(numeroColunaParametro != null) {
                        var counterResultados = 2;
                        for(counterResultados in resultados){
                            if(resultados[counterResultados][numeroColunaParametro] !== "") {
                                console.log(resultados[counterResultados][numeroColunaParametro]);
                                var exame = null;
                                for(var counterExame in exames){
                                    if(parametros[counterParametros].idExame === exames[counterExame].id) {
                                        exame = exames[counterExame];

                                        for(var counterPessoas in pessoas) {
                                            if(pessoas[counterPessoas].matricula === resultados[counterResultados][numeroColunaMatricula]) {
                                                var data = {
                                                    data: resultados[counterResultados][numeroColunaDataExame],
                                                    idPessoa: pessoas[counterPessoas].id,
                                                    idExame: exame.id
                                                }
                                                ResultadoExame.create(data).then(response => {
                                                    console.log(response);
                                                });
                                            }
                                        }

                                        break;
                                    }
                                }

                            }
                        }
                    }

                }

            });
        });
    });

    res.status(200).json(req.body.resultados);
};

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
