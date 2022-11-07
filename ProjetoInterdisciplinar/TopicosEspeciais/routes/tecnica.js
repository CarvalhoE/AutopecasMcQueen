let express = require('express');
let router = express.Router();
let fs = require('fs');
let http = require('http');

let db = require('../database');

//Produtos
router.get('/tecnica/produtos', function (req, res, next) {
    if (req.session.loggedin) {
        let query = `Select ID_Produto
                           ,NR_SKU
                           ,NM_Produto
                           ,VL_Preco
                           ,DS_Marca
                           ,C.DS_Categoria
                        From Produto P
                        Inner Join Categoria C
                            On P.ID_Categoria = C.ID_Categoria`
        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.produtos = rows;

            res.render('tecnica/produtos', {
                name: req.session.name,
                values: req.session.produtos
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/novoProduto', function (req, res, next) {
    if (req.session.loggedin) {
        db.query('Select * From Categoria', function (err, rows, fields) {
            if (err) throw err;

            req.session.categorias = rows;

            res.render('tecnica/novoProduto', {
                name: req.session.name,
                categorias: req.session.categorias
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Cadastro de Produto
router.post('/cadastraProduto', function (req, res, next) {
    if (req.session.loggedin) {
        let data = {
            "NM_Produto": req.body.nmProduto,
            "DS_Marca": req.body.dsMarca,
            "VL_Preco": req.body.vlPreco,
            "NR_SKU": req.body.nrSKU,
            "ID_Categoria": req.body.categoria,
            "DS_Descricao": req.body.dsDescricao
        }

        db.query('Insert Into Produto Set ?', data, (err, result, fields) => {
            if (err) throw err;
            console.log(err);
            req.flash('success', "Produto Inserido com sucesso!")
            res.redirect('/tecnica/produtos');
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/alteraProduto/(:id)', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;
        let query = `Select P.*
                           ,C.DS_Categoria
                         From Produto P
                         Inner Join Categoria C
                            On P.ID_Categoria = C.ID_Categoria
                         Where ID_Produto = ${id}`

        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.produto = rows[0];

            res.render('tecnica/alteraProduto', {
                name: req.session.name,
                produto: req.session.produto,
                id: id
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.post('/alteraProduto/(:id)', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;

        let data = {
            NM_Produto: req.body.nmProduto,
            DS_Descricao: req.body.dsDescricao,
            VL_Preco: req.body.vlPreco
        }

        db.query(`Update Produto Set ? Where ID_Produto = ${id}`, data, function (err, rows, fields) {
            if (err) throw err;
            console.log(err);
            req.flash('success', "Produto alterado com sucesso!")
            res.redirect('/tecnica/produtos');
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/produtoDetalhe/(:id)', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;
        let query = `Select P.*
                           ,C.DS_Categoria
                         From Produto P
                         Inner Join Categoria C
                            On P.ID_Categoria = C.ID_Categoria
                         Where ID_Produto = ${id}`

        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.produto = rows[0];

            res.render('tecnica/produtoDetalhe', {
                name: req.session.name,
                produto: req.session.produto,
                nomeProduto: req.session.produto.NM_Produto
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/cadastraFuncionario', function (req, res, next) {
    if (req.session.loggedin) {

        res.render('tecnica/cadastraFuncionario', {
            name: req.session.name,
            message: req.flash('message'),
            status: req.flash('status'),
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/perfil', function (req, res, next) {
    if (req.session.loggedin) {
        db.query(`Select ID_Funcionario
                    ,NM_Nome
                    ,NR_Codigo
                    ,NR_Telefone
                    ,DS_Email
                From Funcionario
                Where ID_Funcionario = ${req.session.user_id};`, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionario = rows[0];
            res.render('tecnica/perfil', {
                name: req.session.name,
                funcionario: req.session.funcionario
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Cadastrar Funcionario (problema no cadastro de tabela dependente)
router.post('/cadastroUsuario', (req, res, next) => {
    if (req.session.loggedin) {
        let data = {
            "NM_Nome": req.body.nomeFuncionario,
            "NR_CPF": req.body.cpfFuncionario,
            "NR_Telefone": req.body.telefoneFuncionario,
            "DS_Email": req.body.emailFuncionario,
            "DT_Nascimento": req.body.dtNascimentoFuncionario,
            "NR_Codigo": req.body.codigoFuncionario,
            "DS_Login": req.body.loginFuncionario,
            "NR_Senha": req.body.senhaFuncionario,
            "FL_Habilitado": req.body.flHabilitadoFuncionario
        }

        db.query('Insert Into Funcionario Set ?', [data], (err, result, fields) => {
            if (err) throw err;

            req.flash('success', "Funcionário Inserido com sucesso!")
            res.redirect('/tecnica/funcionarios');
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }

});

//Funcionarios 
router.get('/tecnica/funcionarios', function (req, res, next) {
    if (req.session.loggedin) {
        let query = `Select ID_Funcionario
                           ,NR_Codigo
                           ,NM_Nome
                           ,DS_Email
                       From Funcionario`
        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionarios = rows;
            res.render('tecnica/funcionarios', {
                message: req.flash('message'),
                status: req.flash('status'),
                name: req.session.name,
                values: req.session.funcionarios
            });
        });
    } else {
        req.flash('error', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Alterar Funcionario
router.get('/tecnica/alteraFuncionario/(:id)', (req, res, next) => {
    if (req.session.loggedin) {
        let id = req.params.id

        db.query(`Select * From Funcionario Where ID_Funcionario = ${id};`, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionario = rows[0];

            res.render('tecnica/alteraFuncionario', {
                name: req.session.name,
                funcionario: req.session.funcionario,
                id: id
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.post('/alteraFuncionario/(:id)', (req, res, next) => {
    if (req.session.loggedin) {
        let id = req.params.id

        let data = {
            "NM_Nome": req.body.nomeFuncionario,
            "NR_Telefone": req.body.telefoneFuncionario,
            "DS_Email": req.body.emailFuncionario,
            "NR_Senha": req.body.senhaFuncionario,
            "FL_Habilitado": req.body.flHabilitadoFuncionario
        }
        db.query(`Update Funcionario Set ? Where ID_Funcionario = ${id}`, [data], (err, ret) => {
            if (err) throw err;

            req.flash('message', "Funcionário atualizado com sucesso!");
            req.flash('status', "success");
            res.redirect('/tecnica/funcionarios');
        });

    } else {
        req.flash('message', 'é necessário estar logado para acessar esta página');
        res.redirect('/login');
    }
});

router.get('/tecnica/relatorios', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/relatorios', {
            name: req.session.name,
            session: req.session
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/geraRelatorioJson', (req, res, next) => {
    if (req.session.loggedin) {
        const file = fs.createWriteStream('relatorio/vendas.json');

        http.get(`http://localhost:3000/capturaVendas`, (response) => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log('Download completed!')
            })

            fs.readFile('relatorio/vendas.json', {
                encoding: 'utf-8'
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('tecnica/relatorios');
                } else {
                    res.json(JSON.parse(data))
                }
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/geraRelatorioXml', (req, res, next) => {
    if (req.session.loggedin) {
        const file = fs.createWriteStream('relatorio/clientes.xml');

        http.get(`http://localhost:3000/capturaClientes`, (response) => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log('Download completed!')
            })

            // fs.open('relatorio/clientes.xml', (err, data) => {
            //     res.send(data)
            // });

            fs.readFile('relatorio/clientes.xml', {
                encoding: 'utf-8'
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('tecnica/relatorios');
                } else {
                    console.log(data)
                    res.send(data)
                }
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/capturaVendas', (req, res) => {
    db.query('Select * From Pedido', (err, rows, fields) => {
        res.json(rows)
    });
});

router.get('/capturaClientes', (req, res) => {
    db.query('Select * From Cliente', (err, rows, fields) => {
        let xml = `<?xml version="1.1" encoding="UTF-8"?><clientes>`;
        rows.forEach(item => {
            xml += `<cliente>
                        <Id>${item.ID_Cliente}</Id>
                        <Nome>${item.NM_Nome}</Nome>
                        <Cpf>${item.NR_CPF}</Cpf>
                        <Email>${item.DS_Email}</Email>
                        <Telefone>${item.NR_Telefone}</Telefone>
                        <Nascimento>${item.DT_Nascimento.toLocaleDateString('pt-BR', {year:"numeric", month:"numeric", day:"numeric"})}</Nascimento>
                        <Cadastro>${item.DT_Cadastro}</Cadastro>
                    </cliente>`
        });
        xml += "</clientes>"

        res.send(xml);
    });
});

module.exports = router;