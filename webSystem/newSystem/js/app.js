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

app.get('/products', (req, res)=>{
    let cmd_selectAll = "SELECT * FROM PRODUTO;";
    db.query(cmd_selectAll,(err, rows)=>{
        res.status(200).json(rows);
    });
});