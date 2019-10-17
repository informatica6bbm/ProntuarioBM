'use strict';

const env = require('./../../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
    dialectOptions: {
        useUTC: false,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
              return new Date(field.string() + 'Z');
            }
            return next()
        }
    },
    timezone: '-03:00'
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const ResultadoParametroExame = sequelize.define('resultadoparametroexame', {
    idResultadoExame: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'resultadoexame'
            },
            key: 'id'
        }
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idParametro: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'parametroexame'
            },
            key: 'id'
        }
    },
    idExame: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'exame'
            },
            key: 'id'
        }
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'resultadoparametroexame'
});

ResultadoParametroExame.addHook('beforeValidate', (resultadoParametroExame, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    resultadoParametroExame.updatedAt = data;
});

ResultadoParametroExame.sync({
    force: false
});

module.exports = ResultadoParametroExame;
