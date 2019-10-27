'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const batalhao = require('./routes/batalhao-routes');
const escala = require('./routes/escala-routes');
const exame = require('./routes/exame-routes');
const hierarquia = require('./routes/hierarquia-routes');
const setor = require('./routes/setor-routes');
const pessoa = require('./routes/pessoa-routes');
const parametroExame = require('./routes/parametroExame-routes');
const referenciaParametroExame = require('./routes/referenciaParametroExame-routes');
const resultadoExame = require('./routes/resultadoExame-routes');
const resultadoParametroExame = require('./routes/resultadoParametroExame-routes');
const login = require('./routes/login-routes');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });


app.use('/api', index);
app.use('/api/batalhao', batalhao);
app.use('/api/escala', escala);
app.use('/api/exame', exame);
app.use('/api/hierarquia', hierarquia);
app.use('/api/login', login);
app.use('/api/parametroExame', parametroExame);
app.use('/api/referenciaParametroExame', referenciaParametroExame);
app.use('/api/resultadoexame', resultadoExame);
app.use('/api/resultadoParametroExame', resultadoParametroExame);
app.use('/api/pessoa', pessoa);
app.use('/api/setor', setor);

module.exports = app;
