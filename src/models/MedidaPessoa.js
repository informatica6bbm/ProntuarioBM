'use strict';

const env = require('./../../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const MedidaPessoa = sequelize.define('medidaPessoa', {
    circunferenciaAbdominal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    pressaoArterialSistolica: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    pressaoArterialDiastolica: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    idPessoa: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'pessoa'
            },
            key: 'id'
        }
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'medidaPessoa'
});

MedidaPessoa.sync({
    force: false
});
