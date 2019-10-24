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

const Helpers = {
    getDataHoraAtual,
    formatDate,
    generateToken,
    calculaSegundosSessao
};

module.exports = Helpers;
