let express = require('express');
let router = express.Router();

let db = require('../database');

router.get('/tecnica/fornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        db.query('Select * From Fornecedor', function (err, rows, fields) {
            if (err) throw err;

            req.session.fornecedores = rows;
            res.render('tecnica/fornecedores', {
                name: req.session.name,
                values: req.session.fornecedores
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/funcionarios', function (req, res, next) {
    if (req.session.loggedin) {
        let query = `Select NR_Codigo
                           ,NM_Nome
                           ,DS_Email
                           ,DS_Departamento
                           ,DS_Cargo
                           ,Date_Format(DT_Admissao, '%d/%m/%Y') as DT_Admissao
                       From Funcionario F
                       Inner Join Departamento D
                           On F.ID_Departamento = D.ID_Departamento
                       Inner Join Cargo C
                           On F.ID_Cargo = C.ID_Cargo`
        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionarios = rows;
            res.render('tecnica/funcionarios', {
                name: req.session.name,
                values: req.session.funcionarios
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/produtos', function (req, res, next) {
    if (req.session.loggedin) {
        let query = `Select ID_Produto
                           ,NR_SKU
                           ,NM_Produto
                           ,VL_Preco
                           ,DS_Marca
                           ,C.DS_Categoria
                           ,Case
                                 When 1 Then 'SIM'
                                 Else 'NÃO'
                            End as FL_Disponivel
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

//Configurar Rota
router.get('/tecnica/novoProduto', function (req, res, next) {
    if (req.session.loggedin) {
        db.query('Select * From Produto; Select * From Estoque; Select * From Funcionario;', function (err, rows, fields) {
            if (err) throw err;

            req.session.produto = rows[0];
            req.session.estoque = rows[1];
            req.session.funcionario = rows[2];

            res.render('tecnica/novoProduto', {
                name: req.session.name,
                valuesProduto: req.session.produto,
                valuesEstoque: req.session.estoque,
                valuesFuncionario: req.session.funcionario
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

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

router.get('/tecnica/notas', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/nfe', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/configuracoes', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/configuracoes', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/cadastraFornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/cadastraFornecedor', {
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
        db.query(`Select * From Funcionario Where ID_Funcionario = ${req.session.user_id}`, function(err, rows, fields){
            if (err) throw err;

            req.session.funcionario = rows[0]

            res.render('tecnica/perfil', {
                name: req.session.name,
                values: req.session.funcionario
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.post('/cadastroUsuario', (req, res, next) => {
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

    let dataEndereco = {
        "DS_Logradouro": req.body.logradouroFuncionario,
        "DS_Numero": req.body.numeroFuncionario,
        "DS_Complemento": req.body.complementoFuncionario,
        "DS_CEP": req.body.cepFuncionario,
        "DS_Bairro": req.body.bairroFuncionario,
        "DS_Cidade": req.body.cidadeFuncionario,
        "DS_UF": req.body.ufFuncionario
    }

    let id_Scope;
    db.query('Insert Into Funcionario Set ?', [data], (err, ret) => {
        if (err) throw err;

        id_Scope = ret.insertId;

        console.log('Last insert ID in employees:', res.insertID);

        res.redirect('/tecnica/configuracoes');
    });

    db.query('Insert Into FuncionarioEndereco Set ?', [dataEndereco], (err, ret) => {
        if (err) throw err;
    });
});

module.exports = router;