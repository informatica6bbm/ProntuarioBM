const ENV = require('../config/env');
const mysql = require('mysql2');

const findAll = (table, res) => {
    const connection = mysql.createConnection({
        host     : ENV.DB_HOST,
        port     : ENV.DB_PORT,
        user     : ENV.DB_USERNAME,
        password : ENV.DB_PASSWORD,
        database : ENV.DB_DATABASE
    });

    connection.query('SELECT * FROM ' + table, function(error, results, fields){
        if(error) {
            res.json(error);
        } else {
            res.json(results);
            connection.end();
            console.log('Query executada com sucesso!');
        }
    });
}

const find = (sqlQry, res) => {
    const connection = mysql.createConnection({
        host     : ENV.DB_HOST,
        port     : ENV.DB_PORT,
        user     : ENV.DB_USERNAME,
        password : ENV.DB_PASSWORD,
        database : ENV.DB_DATABASE
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error) {
            res.json(error);
        } else {
            res.json(results);
            connection.end();
            console.log('Query executada com sucesso!');
        }
    });
}

const insert = ( tabela,colunas, valores, res) => {
    const connection = mysql.createConnection({
        host     : ENV.DB_HOST,
        port     : ENV.DB_PORT,
        user     : ENV.DB_USERNAME,
        password : ENV.DB_PASSWORD,
        database : ENV.DB_DATABASE
    });
    var arrayValores = "";
    for(var i = 0; i < valores.length; i++){
        arrayValores != "" ? arrayValores = arrayValores + ",'" + valores[i] + "'": arrayValores = arrayValores + "'"  + valores[i] + "'";
    }

    var query = "INSERT INTO " + tabela + "(" + colunas.toString() + ") VALUES(" + arrayValores + ")";

    connection.query(query, function(error, results, fields){
        if(error) {
            res.json(error);
        } else {
            res.json(true);
            connection.end();
            console.log('Query executada com sucesso!');
        }
    });
}

const update = ( tabela,colunas, valores, res) => {
    const connection = mysql.createConnection({
        host     : ENV.DB_HOST,
        port     : ENV.DB_PORT,
        user     : ENV.DB_USERNAME,
        password : ENV.DB_PASSWORD,
        database : ENV.DB_DATABASE
    });
    
    var arrayValores = "";
    for(var i = 0; i < valores.length; i++){
        arrayValores != "" ? arrayValores = arrayValores + ",'" + valores[i] + "'": arrayValores = arrayValores + "'"  + valores[i] + "'";
    }

    var query = "INSERT INTO " + tabela + "(" + colunas.toString() + ") VALUES(" + arrayValores + ")";

    connection.query(query, function(error, results, fields){
        if(error) {
            res.json(error);
        } else {
            res.json(true);
            connection.end();
            console.log('Query executada com sucesso!');
        }
    });
}

const DB = {
    findAll,
    find,
    insert,
    update
};

module.exports = DB;
