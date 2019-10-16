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

const Helpers = {
    getDataHoraAtual,
    formatDate
};

module.exports = Helpers;
