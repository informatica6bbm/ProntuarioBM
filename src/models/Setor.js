'use strict';

const env = require('../../../config/env');

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

const Setor = sequelize.define('setor', {
    setor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idLocal: {
        type: Sequelize.INTEGER,
        unique: false,
        references: {
            model: {
                tableName: 'local'
            },
            key: 'id'
        }
    },
},
{
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    tableName: 'setor'
});

Setor.sync({force: false});
