function getDataHoraAtual() {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');

    return data;
}

const Helpers = {
    getDataHoraAtual
};

module.exports = Helpers;
