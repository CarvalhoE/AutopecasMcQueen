const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/connection');
const port = 3000;

const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Projeto executando na porta ${port}`);
});

app.get('/', (req, res)=>{
        res.send('Conexão OK!');
});

app.get('/produtos', (req, res) => {
    db.connect(function(err) {
        db.query("SELECT * FROM Produto", function (err, result) {
          if (err) throw err;
          res.status(200).json(result);
        });
    })
})

app.get('/categorias', (req, res) => {
    db.connect(function(err) {
        db.query("SELECT * FROM Categoria", function (err, result) {
          if (err) throw err;
          res.status(200).json(result);
        });
    })
})