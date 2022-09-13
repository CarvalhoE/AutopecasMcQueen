const express = require('express');
const bodyParser = require('body-parser');
const db = require('./connection');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`Projeto executando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.send('Conexão OK!');
});


const departamentoController = require('./controllers/departamentoController')
const produtoController = require('./controllers/produtoController')

//Departamentos
app.get('/departamentos', departamentoController.findAll);

//Produto
app.get('/produtos', produtoController.findAll);
app.post('/produtos', produtoController.insert);
app.put('/produtos', produtoController.update);
app.delete('/produtos', produtoController.delete);