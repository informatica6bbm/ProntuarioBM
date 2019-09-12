function getDataHoraAtual() {
    var data=new Date()
    var dia=data.getDate();
    var mes=data.getMonth();
    var ano=data.getFullYear();
    var hora= data.getHours();
    var minutos=data.getMinutes();
    var segundos=data.getSeconds();

    var dataAtual = ano + '-' + ((mes++) < 10 ? "0" + mes : mes) + '-' + dia + " ";
    dataAtual = dataAtual +  hora +":"+(minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos );

    return dataAtual;
}

const Helpers = {
    getDataHoraAtual
};

module.exports = Helpers;
