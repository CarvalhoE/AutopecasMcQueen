let express = require('express');
let router = express.Router();

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

//Detalhe Produto
router.get('/tecnica/relatorios', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/relatorios', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/cadastraFuncionario', function (req, res, next) {
    if (req.session.loggedin) {

        db.query('Select * From Departamento; Select * From Cargo; Select * From Perfil;', function (err, rows, fields) {
            if (err) throw err;

            req.session.depto = rows[0];
            req.session.cargo = rows[1];
            req.session.perfil = rows[2];

            res.render('tecnica/cadastraFuncionario', {
                name: req.session.name,
                valuesDepto: req.session.depto,
                valuesCargo: req.session.cargo,
                valuesPerfil: req.session.perfil
            });
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
            "ID_Departamento": req.body.departamentoFuncionario,
            "ID_Cargo": req.body.cargoFuncionario,
            "ID_Perfil": req.body.perfilFuncionario,
            "FL_Habilitado": req.body.flHabilitadoFuncionario,
            "DT_Admissao": req.body.dtAdmissaoFuncionario
        }

        db.query('Insert Into Funcionario Set ?', [data], (err, result, fields) => {
            if (err) throw err;
        });

        let query = `Insert Into FuncionarioEndereco Set 
        ID_Funcionario  = (Select max(ID_Funcionario) From Funcionario),
        DS_Logradouro   = '${req.body.logradouroFuncionario}',
        DS_Numero       = '${req.body.numeroFuncionario}',
        DS_Complemento  = '${req.body.complementoFuncionario}',
        DS_CEP          = '${req.body.cepFuncionario}',
        DS_Bairro       = '${req.body.bairroFuncionario}',
        DS_Cidade       = '${req.body.cidadeFuncionario}',
        DS_UF           = '${req.body.ufFuncionario}'
        `;

        db.query(query, (err, ret) => {
            if (err) throw err;

            req.flash('sucess', "Funcionário Inserido com sucesso!")
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

        db.query(`
            Select * From Departamento; 
            Select * From Cargo; 
            Select * From Perfil; 
            Select * From Funcionario 
                Where ID_Funcionario = ${id};
            Select * From FuncionarioEndereco
                Where ID_Funcionario = ${id};`, function (err, rows, fields) {
            if (err) throw err;

            req.session.depto = rows[0];
            req.session.cargo = rows[1];
            req.session.perfil = rows[2];
            req.session.funcionario = rows[3];
            req.session.funcionarioEndereco = rows[4];

            res.render('tecnica/alteraFuncionario', {
                name: req.session.name,
                valuesDepto: req.session.depto,
                valuesCargo: req.session.cargo,
                valuesPerfil: req.session.perfil,
                funcionario: req.session.funcionario,
                funcionarioEndereco: req.session.funcionarioEndereco,
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
            "ID_Departamento": req.body.departamentoFuncionario,
            "ID_Cargo": req.body.cargoFuncionario,
            "ID_Perfil": req.body.perfilFuncionario,
            "FL_Habilitado": req.body.flHabilitadoFuncionario
        }
        db.query(`Update Funcionario Set ? Where ID_Funcionario = ${id}`, [data], (err, ret) => {
            if (err) throw err;
        });

        let dataEndereco = {
            "DS_Logradouro": req.body.logradouroFuncionario,
            "DS_Numero": req.body.numeroFuncionario,
            "DS_Complemento": req.body.complementoFuncionario,
            "DS_CEP": req.body.cepFuncionario,
            "DS_Bairro": req.body.bairroFuncionario,
            "DS_Cidade": req.body.cidadeFuncionario,
            "DS_UF": req.body.ufFuncionario
        }

        db.query(`Update FuncionarioEndereco Set ? Where ID_Funcionario = ${id}`, [dataEndereco], (err, ret) => {
            if (err) throw err;

            req.flash('sucess', "Funcionário Inserido com sucesso!")
            res.redirect('/tecnica/funcionarios');
        });

    } else {
        req.flash('message', 'é necessário estar logado para acessar esta página');
        res.redirect('/login');
    }
});
module.exports = router;