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

const Pessoa = sequelize.define('pessoa', {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    estadoCivil: {
        type: Sequelize.STRING(56),
        allowNull: false
    },
    dataIngresso: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cartaoMunicipalSus: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    cartaoNacionalSus: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    tipoSanguineo: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    altura: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    tipoSanguineo: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    lts: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    foto: {
        type: Sequelize.TEXT('medium'),
        allowNull: false,
        unique: true
    },
    idHierarquia: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'hierarquia'
            },
            key: 'id'
        }
    },
    idSetor: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'setor'
            },
            key: 'id'
        }
    },
    idBatalhao: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'batalhao'
            },
            key: 'id'
        }
    },
    idEscala: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'escala'
            },
            key: 'id'
        }
    }
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'pessoa'
});

Pessoa.sync({
    force: false
});

module.exports = Pessoa;
