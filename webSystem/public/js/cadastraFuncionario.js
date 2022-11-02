'use strict'
var app = require('../../app');

document.getElementById('departamento').addEventListener('load', () => {
    const departamentoController = require('../../controllers/departamentoController');
    app.get('/departamentos', departamentoController.findAll);
});