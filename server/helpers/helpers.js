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


const Helpers = {
    getDataHoraAtual,
    formatDate,
    generateToken
};

module.exports = Helpers;
