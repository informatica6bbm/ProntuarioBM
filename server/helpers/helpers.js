var randomBytes = require('randombytes');

function getDataHoraAtual() {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');

    return data;
}

function formatDate(date) {
    var data = new Date(date);
    var dia = data.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;
    var mes  = (data.getMonth()+1).toString();
    var mesF = (mes.length == 1) ? '0'+mes : mes;
    var anoF = data.getFullYear();

    return diaF + "/" + mesF + "/" + anoF;
}

function generateToken() {
    var cifra = bin2hex(randomBytes(256));
    var token = "";
    for(var i = 0; i < 254;i++){
        token += cifra[i];
    }

    function bin2hex(s){
        var v,i, f = 0, a = [];
        s += '';
        f = s.length;

        for (i = 0; i<f; i++) {
            a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");
        }

        return a.join('');
    }

    return token;
}

async function calculaSegundosSessao(dataInicial){
    var dataSessao = new Date(dataInicial);

    var horaInicioSessao = dataSessao.getUTCHours();
    var minutosInicioSessao = dataSessao.getUTCMinutes();
    var segundosInicioSessao = dataSessao.getUTCSeconds();

    var dataAtual = new Date();
    var horaAtual = dataAtual.getHours();
    var minutosAtual = dataAtual.getMinutes();
    var segundosAtual = dataAtual.getSeconds();

    var segundosIniciais = 0;
    segundosIniciais += horaInicioSessao * 3600;
    segundosIniciais += minutosInicioSessao * 60;
    segundosIniciais += segundosInicioSessao;

    var segundoFinal = 0;
    segundoFinal += horaAtual * 3600;
    segundoFinal += minutosAtual * 60;
    segundoFinal += segundosAtual;

    var segundos = segundosIniciais - segundoFinal;
    return await segundos < 0 ? segundos * -1 : segundos;
}

function getUsuarioEmail(email) {
    var usuario = "";
    for(var i = 0; i < email.length; i++){
        if(email[i] != "@") {
            usuario += email[i];
        }else {
            break;
        }
    }

    return usuario;
}

function getNumeroColuna(nomeColuna, cabecalho){
    for(var i in cabecalho) {
        if(cabecalho[i].toUpperCase().localeCompare(nomeColuna) == 0) {
            return i;
        }
    }

    return null;
}

function getIdHierarquia(abreviacao, hierarquias) {
    var i = 0;
    for(i in hierarquias) {
        if(hierarquias[i].hierarquia.toUpperCase().localeCompare(abreviacao.toUpperCase()) == 0){
            return hierarquias[i].id;
        }
    }
}

function validaPessoa(pessoa) {
    if(pessoa != undefined) {
        return pessoa.usuario != "" &&
        pessoa.email != "" &&
        pessoa.nome != "" &&
        pessoa.matricula != "" &&
        pessoa.dataNascimento != "" &&
        pessoa.estadoCivil != "" &&
        pessoa.dataIngresso != "" &&
        pessoa.cartaoNacionalSus != "" &&
        pessoa.cartaoMunicipalSus != "" &&
        pessoa.sexo != "" &&
        pessoa.tipoSanguineo != "" &&
        pessoa.lts != null &&
        pessoa.tipoPessoa != null &&
        pessoa.idHierarquia != null &&
        pessoa.idSetor != null &&
        pessoa.idBatalhao != null &&
        pessoa.idEscala != null
    }
}

function getIdSetor(setores, setor) {
    var i = 0;
    for(i in setores) {
        if(setores[i].setor.localeCompare(setor) == 0){
            return setores[i].id;
        }
    }
}

function getIdEscala(escalas, escala) {
    var i = 0;
    for(i in escalas) {
        if(escalas[i].escala.localeCompare(escala) == 0){
            return escalas[i].id;
        }
    }
}

function getIdObm(obms, obm) {
    var i = 0;
    for(i in obms) {
        if(obms[i].abreviacao.localeCompare(obm) == 0){
            return obms[i].id;
        }
    }
}

function buscaCaracter(texto) {
    if(texto != "") {
        for(var i = 0; i < texto.length; i++){
            if(texto[i] == 'º'){
                texto = texto.split("º").join('°');

            }
        }
    }

    return texto;
}

const Helpers = {
    getDataHoraAtual,
    formatDate,
    generateToken,
    calculaSegundosSessao,
    getUsuarioEmail,
    getNumeroColuna,
    getIdHierarquia,
    validaPessoa,
    getIdSetor,
    getIdEscala,
    getIdObm,
    buscaCaracter
};

module.exports = Helpers;
