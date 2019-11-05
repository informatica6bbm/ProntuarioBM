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
    var item = {};
    var parametro = {};
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
                        var contaResultadosExames = 0;
                        var i = 0;
                        var j = 0;
                        var k = 0;
                        for(i in resultados){
                            item.data = Helpers.formatDate(resultados[i].data);
                            var contaExames = 0;
                            for(contaExames in exames){
                                if(exames[contaExames].id == resultados[i].idExame){
                                    item.idExame = exames[contaExames].id;
                                    item.exame = exames[contaExames].exame;
                                    break;
                                }
                            }
                            var contaPessoas = 0;
                            for(contaPessoas in pessoas){
                                if(pessoas[contaPessoas].id == resultados[i].idPessoa) {
                                    item.nome = pessoas[contaPessoas].nome;
                                    item.idPessoa  = pessoas[contaPessoas].id;
                                }
                            }
                            var contaResultadosExames = 0;
                            for(contaResultadosExames in resultadoParametroExame){
                                if(resultadoParametroExame[contaResultadosExames].idResultadoExame == resultados[i].id && resultadoParametroExame[contaResultadosExames].idExame ==  resultados[i].idExame) {
                                    for(k in parametros){
                                        if(parametros[k].id == resultadoParametroExame[contaResultadosExames].idParametro) {
                                            parametro.id =  resultadoParametroExame[contaResultadosExames].idParametro;
                                            parametro.parametro = parametros[k].parametro;
                                            parametro.valor = resultadoParametroExame[contaResultadosExames].valor;
                                            break;
                                        }
                                    };
                                    item.parametros.push(parametro);
                                    parametro = {};
                                }
                            }
                            resultadosExames[resultadosExames.length] = item;
                            item = {};
                            parametro = {};
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

    Pessoa.findAll().then(response => {
        const pessoas = response;
        
        ParametroExame.findAll().then(response => {
            var parametros = response;
            var item = {};
            var resultadosParametros = [];
            var contaParametro = 0;
            for(contaParametro in parametros){
                var numeroColunaParametro = Helpers.getNumeroColuna(parametros[contaParametro].parametro.toUpperCase(),cabecalho);
                if(numeroColunaParametro != null) {
                    var contaResultados = 2;
                    for(contaResultados in resultados){
                        if(resultados[contaResultados][numeroColunaParametro] !== "") {
                            if(!(resultados[contaResultados][numeroColunaParametro] == 'X') && resultados[contaResultados][numeroColunaParametro] != undefined) {
                                var contaPessoa = 0;
                                for(contaPessoa in pessoas){
                                    if(pessoas[contaPessoa].matricula === resultados[contaResultados][numeroColunaMatricula]) {
                                        item.valor = resultados[contaResultados][numeroColunaParametro];
                                        item.idParametro = parametros[contaParametro].id;
                                        item.idExame = parametros[contaParametro].idExame;
                                        item.idResultadoExame = "";
                                        item.data = resultados[contaResultados][numeroColunaDataExame];
                                        item.idPessoa = pessoas[contaPessoa].id;
                                        resultadosParametros.push(item);
                                        item = {};
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

 
            var resultExame = {};
            var res = [];
            var conta = 0;
            for(conta in resultadosParametros) {
                var data = {
                    data: resultadosParametros[conta].data,
                    idPessoa: resultadosParametros[conta].idPessoa,
                    idExame: resultadosParametros[conta].idExame
                }
                
                if(res.length == 0) {
                    data.data = data.data.split('/').reverse().join('-');
                    res.push(data);
                }
                if(res.length > 0) {
                    var contaResult = 0;
                    for(contaResult in res){
                        if(res[contaResult].idPessoa != data.idPessoa) {
                            data.data = data.data.split('/').reverse().join('-');
                            res.push(data);
                            break;
                        }
                    }
                    data = {};
                } 
            }

            var i = 0;
            for(var i in res){
                ResultadoExame.create(res[i]).then(response => {
                    if(response){
                        // console.log(response.data);
                        var k = 0;
                        for(k in resultadosParametros) {
                            if(response.idPessoa == resultadosParametros[k].idPessoa && response.idExame == resultadosParametros[k].idExame) {
                                resultadosParametros[k].idResultadoExame = response.id;
                                ResultadoParametroExame.create(resultadosParametros[k]).then(response => {
                                    console.log(response.id);
                                });
                            }
                        }
                    }
                });
            }

            console.log(res);
        });

    });

    async function insereResultadoExame(data) {
        let response = await ResultadoExame.create(data);
        return response;
    }

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
