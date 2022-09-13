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

app.get('/produtos', (req, res) => {
    db.connect(function (err) {
        db.query("SELECT * FROM Produto", function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })
})

app.get('/departamentos', (req, res) => {
    db.connect(function (err) {
        db.query("SELECT * FROM Departamento", function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    })
})

app.post('/criaProduto', (req, res) => {
    let data = req.body;
    let insertCommand = "Insert Into Produto (NM_Produto, VL_Preco, DS_Marca, ID_Categoria) Values (?,?,?,1)";
    let bodyData = [data.productName, data.productPrice, data.productBrand]

    db.query(insertCommand, bodyData, (error, result) => {
        if (error) {
            res.status(400).send({
                message: error
            })
        } else {
            res.status(201).json({
                message: "Produto criado com sucesso!"
            })
        }
    });
});