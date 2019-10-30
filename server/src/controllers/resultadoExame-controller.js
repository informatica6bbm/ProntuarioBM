'use strict';
const Helpers = require("./../../helpers/helpers");
const ResultadoExame = require('./../models/ResultadoExame');
const ResultadoParametroExame = require('./../models/ResultadoParametroExame');

const Pessoa = require('./../models/Pessoa');
const Hierarquia = require('./../models/Hierarquia');
const Setor = require('./../models/Setor');
const Batalhao = require('./../models/Batalhao');
const Escala = require('./../models/Escala');

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

    var pessoa = {
        usuario: "",
        email: "",
        nome: "",
        matricula: "",
        dataNascimento: "",
        estadoCivil: "",
        dataIngresso: "",
        cartaoNacionalSus: "",
        cartaoMunicipalSus: "",
        sexo: "",
        tipoSanguineo: "",
        lts: null,
        foto: "",
        tipoPessoa: false,
        idHierarquia: null,
        idSetor: null,
        idBatalhao: null,
        idEscala: null
    }

    var numeroColunasPessoa = {
        email:              Helpers.getNumeroColuna('EMAIL',cabecalho),
        nome:               Helpers.getNumeroColuna('NOME',cabecalho),
        matricula:          Helpers.getNumeroColuna('MATRÍCULA',cabecalho),
        dataNascimento:     Helpers.getNumeroColuna('DATA_NASCIMENTO',cabecalho),
        estadoCivil:        Helpers.getNumeroColuna('ESTADO_CIVIL',cabecalho),
        dataIngresso:       Helpers.getNumeroColuna('DATA_INGRESSO',cabecalho),
        cartaoNacionalSus:  Helpers.getNumeroColuna('CARTÃO_NACIONAL_SUS',cabecalho),
        cartaoMunicipalSus: Helpers.getNumeroColuna('CARTÃO_MUNICIPAL_SUS',cabecalho),
        sexo:               Helpers.getNumeroColuna('SEXO',cabecalho),
        tipoSanguineo:      Helpers.getNumeroColuna('TIPO_SANGUÍNEO',cabecalho),
        lts:                Helpers.getNumeroColuna('LTS',cabecalho),
        hierarquia:         Helpers.getNumeroColuna('HIERARQUIA',cabecalho),
        setor:              Helpers.getNumeroColuna('SETOR',cabecalho),
        batalhao:           Helpers.getNumeroColuna('BATALHÃO',cabecalho),
        escala:             Helpers.getNumeroColuna('ESCALA',cabecalho)
    }

    Batalhao.findAll().then(response => {
        const batalhoes = response;
        Setor.findAll().then(response => {
            const setores = response;
            Hierarquia.findAll().then(response => {
                var hierarquias = response;
                Escala.findAll().then(response => {
                    const escalas = response;
                    var numeroPessoasImportadas = 0;
                    var numeroPessoasNaoImportadas = 0;
                    var i = 3;
                    for(i in resultados){
                        if(resultados[i][numeroColunasPessoa.hierarquia] != undefined) {
                            resultados[i][numeroColunasPessoa.hierarquia] = Helpers.buscaCaracter(resultados[i][numeroColunasPessoa.hierarquia]);
                        }
                    }
                    var pessoas = [];
                    for(var k = 2; k < resultados.length; k++) {
                        if(resultados[k] != "") {
                            pessoa.usuario =            Helpers.getUsuarioEmail(resultados[k][numeroColunasPessoa.email]);
                            pessoa.email =              resultados[k][numeroColunasPessoa.email];
                            pessoa.nome =               resultados[k][numeroColunasPessoa.nome];
                            pessoa.matricula =          resultados[k][numeroColunasPessoa.matricula];
                            pessoa.dataNascimento =     resultados[k][numeroColunasPessoa.dataNascimento];
                            pessoa.estadoCivil =        resultados[k][numeroColunasPessoa.estadoCivil].toUpperCase();
                            pessoa.dataIngresso =       resultados[k][numeroColunasPessoa.dataIngresso];
                            pessoa.cartaoNacionalSus =  resultados[k][numeroColunasPessoa.cartaoNacionalSus];
                            pessoa.cartaoMunicipalSus = resultados[k][numeroColunasPessoa.cartaoMunicipalSus];
                            pessoa.sexo =               resultados[k][numeroColunasPessoa.sexo].toUpperCase();
                            pessoa.tipoSanguineo =      resultados[k][numeroColunasPessoa.tipoSanguineo];
                            pessoa.lts =                resultados[k][numeroColunasPessoa.lts];
                            pessoa.idHierarquia =       Helpers.getIdHierarquia(resultados[k][numeroColunasPessoa.hierarquia], hierarquias);
                            pessoa.idSetor =            Helpers.getIdSetor(setores, resultados[k][numeroColunasPessoa.setor]);
                            pessoa.idBatalhao =         Helpers.getIdObm(batalhoes, resultados[k][numeroColunasPessoa.batalhao]);
                            pessoa.idEscala =           Helpers.getIdEscala(escalas, resultados[k][numeroColunasPessoa.escala]);

                            if(Helpers.validaPessoa(pessoa)){
                                pessoas.push(pessoa);
                                // console.log(pessoa.nome);
                            }else {
                                // console.log(pessoa.nome);
                            }
                        }
                    }
                    for(var e in pessoas) {
                        console.log(pessoas[e].nome);
                    }
                    // Pessoa.bulkCreate(pessoas, { validate: true }).then(response => {
                    //     console.log(response);
                    // });
                });
            });
        });
    });

    Exame.findAll().then(response => {
        var exames = response;
        ParametroExame.findAll().then(response => {
            var parametros = response;

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
