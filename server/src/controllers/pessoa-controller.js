'use strict';

const Helpers = require('./../../helpers/helpers');
const Pessoa = require('./../models/Pessoa');

const Hierarquia = require('./../models/Hierarquia');
const Setor = require('./../models/Setor');
const Batalhao = require('./../models/Batalhao');
const Escala = require('./../models/Escala');

exports.get = (req, res, next) => {
    const id = req.params.id;
    Pessoa.findAll().then(response => {
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
    Pessoa.findAll().then(response => {
        res.status(200).json(JSON.parse(JSON.stringify(response)));
    });
}

exports.importaPessoas = (req, res, next) => {
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

                    var i = 3;
                    for(i in data.resultados){
                        if(resultados[i][numeroColunasPessoa.hierarquia] != undefined) {
                            resultados[i][numeroColunasPessoa.hierarquia] = Helpers.buscaCaracter(data.resultados[i][numeroColunasPessoa.hierarquia]);
                        }
                    }

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
                                var pes = Pessoa.create(pessoa).then(response => {
                                    console.log(response);
                                });

                                if(pes){
                                    numeroPessoasImportadas++;
                                }

                            }else {
                                // console.log(pessoa);
                            }
                        }
                    }
                });
            });
        });
    });
}

exports.post = (req, res, next) => {
    var email = req.body.email;
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var dataNascimento = req.body.dataNascimento;
    var estadoCivil = req.body.estadoCivil;
    var dataIngresso = req.body.dataIngresso;
    var cartaoMunicipalSus = req.body.cartaoMunicipalSus;
    var cartaoNacionalSus = req.body.cartaoNacionalSus;
    var sexo = req.body.sexo;
    var tipoSanguineo = req.body.tipoSanguineo;
    var lts = req.body.lts;
    var foto = req.body.foto;
    var tipoPessoa = req.body.tipoPessoa;
    var idHierarquia = req.body.idHierarquia;
    var idSetor = req.body.idSetor;
    var idBatalhao = req.body.idBatalhao;
    var idEscala = req.body.idEscala;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        dataNascimento: dataNascimento.split("/").reverse().join("-") + " 00:00:00",
        estadoCivil: estadoCivil,
        dataIngresso: dataIngresso.split("/").reverse().join("-") + " 00:00:00",
        cartaoMunicipalSus: cartaoMunicipalSus,
        cartaoNacionalSus: cartaoNacionalSus,
        sexo: sexo,
        tipoSanguineo: tipoSanguineo,
        lts: lts,
        foto: foto,
        tipoPessoa: tipoPessoa,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        idEscala: idEscala,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.create(data).then(response => {
        res.status(200).json(response);
    });
}


exports.update = (req, res, next) => {
    var id = req.body.id;
    var email = req.body.email;
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var dataNascimento = req.body.dataNascimento;
    var estadoCivil = req.body.estadoCivil;
    var dataIngresso = req.body.dataIngresso;
    var cartaoMunicipalSus = req.body.cartaoMunicipalSus;
    var cartaoNacionalSus = req.body.cartaoNacionalSus;
    var sexo = req.body.sexo;
    var tipoSanguineo = req.body.tipoSanguineo;
    var lts = req.body.lts;
    var foto = req.body.foto;
    var tipoPessoa = req.body.tipoPessoa;
    var idHierarquia = req.body.idHierarquia;
    var idSetor = req.body.idSetor;
    var idBatalhao = req.body.idBatalhao;
    var idEscala = req.body.idEscala;

    var data = {
        nome: nome,
        usuario: getUsuarioEmail(email),
        email: email,
        matricula: matricula,
        dataNascimento: dataNascimento.split("/").reverse().join("-") + " 00:00:00",
        estadoCivil: estadoCivil,
        dataIngresso: dataIngresso.split("/").reverse().join("-") + " 00:00:00",
        cartaoMunicipalSus: cartaoMunicipalSus,
        cartaoNacionalSus: cartaoNacionalSus,
        sexo: sexo,
        tipoSanguineo: tipoSanguineo,
        lts: lts,
        foto: foto,
        tipoPessoa: tipoPessoa,
        idHierarquia: idHierarquia,
        idSetor: idSetor,
        idBatalhao: idBatalhao,
        idEscala: idEscala,
        createdAt: Helpers.getDataHoraAtual()
    };
    Pessoa.update(data, {
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

exports.delete = (req, res, next) => {
    var id = req.params.id;
    Pessoa.destroy({
        where: {
            id: id
        }
    }).then(response => {
        res.status(200).json(response);
    });
}

function getUsuarioEmail(email) {
    var usuario = "";
    for(var i = 0; i < email.length;i++){
        if(email[i] == "@"){
            break;
        }else{
			usuario = usuario + email[i];
        }

    }
    return usuario;
}
