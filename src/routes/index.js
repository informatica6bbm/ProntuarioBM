'use strict';
// https://sequelize.org/master/manual/getting-started.html
const express = require('express');
const router = express.Router();

const Escala = require('./../models/Escala');

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Prontuario BM API",
        version: "0.0.1"
    });
});

router.get('/teste', (req, res) =>{
    Escala.findAll().then(response => {
        res.json(response);
    });
    // Escala.create({ escala: "teste"}).then(response => {
    //     // console.log(response);
    // });
    // res.status(200).send({
    //     title: "Prontuario BM API",
    //     version: "0.0.1"
    // });
})

module.exports = router;
