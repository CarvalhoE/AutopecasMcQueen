const express = require('express');
const db = require('./connection');
const port = 3000;

const app = express();

app.listen(port, () => {
    console.log(`Projeto executando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.send('Conexão OK!');
});


const Controller = require('./controllers/Controller')

//Departamentos
app.get('/departamentos', Controller.findAll);