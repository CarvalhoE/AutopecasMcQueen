let express = require('express');
let router = express.Router();
const ExcelJS = require('exceljs');
const {
    Blob
} = require('node:buffer');
const FileSaver = require('file-saver');

let db = require('../database');

router.get('/tecnica/fornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        db.query('Select * From Fornecedor', function (err, rows, fields) {
            if (err) throw err;

            req.session.fornecedores = rows;
            res.render('tecnica/fornecedores', {
                name: req.session.name,
                menus: req.session.menus,
                values: req.session.fornecedores
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/fornecedorDetalhe/(:id)', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;
        db.query(`Select * From Fornecedor Where ID_Fornecedor = ${id}`, function (err, rows, fields) {
            if (err) throw err;

            req.session.fornecedor = rows[0];

            res.render('tecnica/fornecedorDetalhe', {
                name: req.session.name,
                menus: req.session.menus,
                fornecedor: req.session.fornecedor
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Cadastra Fornecedor
router.post('/tecnica/novoFornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        let data = {
            "NM_Empresa": req.body.nomeFornecedor,
            "NR_CNPJ": req.body.nrCnpjCpf,
            "DS_Logradouro": req.body.dsEndereco,
            "DS_Bairro": req.body.dsBairro,
            "DS_Cidade": req.body.dsCidade,
            "DS_CEP": req.body.dsCep,
            "NR_Telefone": req.body.nrTelefone,
            "DS_Email": req.body.dsEmail,
            "NR_Banco": req.body.nrBanco,
            "NR_Agencia": req.body.nrAgencia,
            "NR_Conta": req.body.nrConta
        }

        db.query('Insert Into Fornecedor Set ?', [data], (err, result, fields) => {
            if (err) throw err;
            req.flash('success', "Fornecedor Inserido com sucesso!")
            res.redirect('/tecnica/fornecedor');
        });
    } else {
        req.flash('message', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Remover Fornecedor
router.post('/tecnica/fornecedor/:id', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;
        db.query(`Delete From Fornecedor Where ID_Fornecedor = ?`, id, (err, ret) => {
            if (err) {
                req.flash('error', err)
                res.redirect('/tecnica/fornecedor')
            } else {
                req.flash('success', 'Fornecedor removido com sucesso! id = ' + id)
                res.redirect('/tecnica/fornecedor')
            }
        });
    } else {
        req.flash('message', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

//Alterar fornecedor
router.get('/tecnica/alteraFornecedor/(:id)', (req, res, next) => {
    if (req.session.loggedin) {
        let id = req.params.id;

        db.query(`Select * From Fornecedor Where ID_Fornecedor = ${id}`, function (err, rows, fields) {
            if (err) throw err;

            req.session.fornecedor = rows[0];

            res.render('tecnica/alteraFornecedor', {
                name: req.session.name,
                menus: req.session.menus,
                fornecedor: req.session.fornecedor,
                id: id
            });
        });

    } else {
        req.flash('message', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.post('/alteraFornecedor/:id', (req, res, next) => {
    if (req.session.loggedin) {
        let id = req.params.id;

        let data = {
            "NM_Empresa": req.body.nomeFornecedor,
            "NR_CNPJ": req.body.nrCnpjCpf,
            "DS_Logradouro": req.body.dsEndereco,
            "DS_Bairro": req.body.dsBairro,
            "DS_Cidade": req.body.dsCidade,
            "DS_CEP": req.body.dsCep,
            "NR_Telefone": req.body.nrTelefone,
            "DS_Email": req.body.dsEmail,
            "NR_Banco": req.body.nrBanco,
            "NR_Agencia": req.body.nrAgencia,
            "NR_Conta": req.body.nrConta
        }

        db.query(`Update Fornecedor Set ? Where ID_Fornecedor = ${id}`, [data], (err, result, fields) => {
            if (err) throw err;
            req.flash('success', "Fornecedor Inserido com sucesso!")
            res.redirect('/tecnica/fornecedor');
        });
    } else {

    }
});

//Produtos
router.get('/tecnica/produtos', function (req, res, next) {
    if (req.session.loggedin) {
        let query = `Select ID_Produto
                           ,NR_SKU
                           ,NM_Produto
                           ,VL_Preco
                           ,DS_Marca
                           ,C.DS_Categoria
                           ,FL_Disponivel
                        From Produto P
                        Inner Join Categoria C
                            On P.ID_Categoria = C.ID_Categoria`
        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.produtos = rows;

            res.render('tecnica/produtos', {
                name: req.session.name,
                menus: req.session.menus,
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
                menus: req.session.menus,
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
            NM_Produto: req.body.nmProduto,
            DS_Descricao: req.body.dsDescricao,
            NR_SKU: req.body.nrSKU,
            VL_Preco: req.body.vlPreco,
            VL_BaseDeCompra: req.body.vlCompra,
            FL_Disponivel: true,
            NR_Quantidade: 0,
            DS_Marca: req.body.dsMarca,
            ID_Categoria: req.body.categoria,
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
                menus: req.session.menus,
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
            DS_Marca: req.body.dsMarca,
            VL_Preco: req.body.vlPreco,
            VL_BaseDeCompra: req.body.vlCompra,
            DS_Descricao: req.body.dsDescricao
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
                menus: req.session.menus,
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
            name: req.session.name,
            menus: req.session.menus
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
            name: req.session.name,
            menus: req.session.menus
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/cadastraFornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/cadastraFornecedor', {
            name: req.session.name,
            menus: req.session.menus
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
                menus: req.session.menus,
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
                    ,DS_Departamento
                    ,DS_Cargo
                    ,Date_Format(DT_Admissao, '%d/%m/%Y') as DT_Admissao
                From Funcionario F
                Inner Join Departamento D
                    On F.ID_Departamento = D.ID_Departamento
                Inner Join Cargo C
                    On F.ID_Cargo = C.ID_Cargo
                Where ID_Funcionario = ${req.session.user_id};

                Select * From FuncionarioEndereco Where ID_FuncionarioEndereco = ${req.session.user_id};
                `, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionarioL = rows[0];
            req.session.funcionarioE = rows[1];
            res.render('tecnica/perfil', {
                name: req.session.name,
                menus: req.session.menus,
                funcionarioL: req.session.funcionarioL,
                funcionarioE: req.session.funcionarioE
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
                           ,DS_Login
                           ,DS_Cargo
                           ,FL_Habilitado
                           ,Date_Format(DT_Admissao, '%d/%m/%Y') as DT_Admissao
                       From Funcionario F
                       Inner Join Cargo C
                           On F.ID_Cargo = C.ID_Cargo`
        db.query(query, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionarios = rows;
            res.render('tecnica/funcionarios', {
                name: req.session.name,
                menus: req.session.menus,
                values: req.session.funcionarios
            });
        });
    } else {
        req.flash('error', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/funcionarioDetalhe/(:id)', function (req, res, next) {
    if (req.session.loggedin) {
        let id = req.params.id;
        let query = `Select F.*
                           ,Date_Format(DT_Nascimento, '%d/%m/%Y') as DataNascimento
                           ,Date_Format(DT_Admissao, '%d/%m/%Y') as DataAdmissao
                           ,Date_Format(DT_Demissao, '%d/%m/%Y') as DataDemissao
                           ,D.DS_Departamento
                           ,C.DS_Cargo
                         From Funcionario F
                         Inner Join Departamento D
                            On F.ID_Departamento = D.ID_Departamento
                         Inner Join Cargo C
                            On F.ID_Cargo = C.ID_Cargo
                         Where ID_Funcionario = ${id}`;
        db.query(`${query};Select * From FuncionarioEndereco Where ID_Funcionario = ${id};`, function (err, rows, fields) {
            if (err) throw err;

            req.session.funcionario = rows[0];
            req.session.funcionarioEndereco = rows[1];

            res.render('tecnica/funcionarioDetalhe', {
                name: req.session.name,
                menus: req.session.menus,
                funcionario: req.session.funcionario,
                funcionarioEndereco: req.session.funcionarioEndereco
            });
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
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
                menus: req.session.menus,
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

        db.query(`Select * From Funcionario Where ID_Funcionario = ${id}`, (err, rows, fields) => {
            if (err) throw err;

            let dadosFuncionario = rows[0];
            let data = {
                "NM_Nome": req.body.nomeFuncionario,
                "NR_Telefone": req.body.telefoneFuncionario,
                "DS_Email": req.body.emailFuncionario,
                "ID_Departamento": req.body.departamentoFuncionario,
                "ID_Cargo": req.body.cargoFuncionario,
                "ID_Perfil": req.body.perfilFuncionario,
                "FL_Habilitado": req.body.flHabilitadoFuncionario,
                "DT_Demissao": dadosFuncionario.DT_Demissao
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

            if (dadosFuncionario.FL_Habilitado == 1 && data.FL_Habilitado == 0) {
                data.DT_Demissao = new Date();
            }
            if (dadosFuncionario.FL_Habilitado == 0 && data.FL_Habilitado == 1) {
                data.DT_Demissao = null;
            }

            db.query(`Update Funcionario Set ? Where ID_Funcionario = ${id}`, [data], (err1, ret) => {
                if (err1) throw err1;
            });

            db.query(`Update FuncionarioEndereco Set ? Where ID_Funcionario = ${id}`, [dataEndereco], (err, ret) => {
                if (err) throw err;

                req.flash('sucess', "Funcionário alterado com sucesso!")
                res.redirect('/tecnica/funcionarios');
            });


        });

    } else {
        req.flash('message', 'é necessário estar logado para acessar esta página');
        res.redirect('/login');
    }
});

router.get('/tecnica/relatorio/movimentacao-financeira', (req, res, next) => {
    if (req.session.loggedin) {
        db.query(`Select C.DT_Registro
                        ,C.DS_Descricao
                        ,C.VL_Valor
                        ,SC.DS_SituacaoCobranca
                        ,TC.DS_TipoCobranca
                      From Cobranca C
                      Inner Join SituacaoCobranca SC
                          On C.ID_SituacaoCobranca = SC.ID_SituacaoCobranca
                      Inner Join TipoCobranca TC
                          On C.ID_TipoCobranca = TC.ID_TipoCobranca`, (err, rows, fields) => {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Movimentação Financeira');

            sheet.columns = [{
                    header: 'Data',
                    key: 'data'
                },
                {
                    header: 'Descrição do Lançamento',
                    key: 'descricao'
                },
                {
                    header: 'Valor',
                    key: 'valor'
                },
                {
                    header: 'Tipo de Lançamento',
                    key: 'tipo'
                },
                {
                    header: 'Situação',
                    key: 'situ'
                },
            ]

            rows.forEach(item => {
                sheet.addRow({
                    data: item.DT_Registro,
                    descricao: item.DS_Descricao,
                    valor: item.VL_Valor,
                    tipo: item.DS_TipoCobranca,
                    situ: item.DS_SituacaoCobranca,
                });
            });

            sheet.getRow(1).font = {
                bold: true,
            }

            sheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'FFFB00'
                }
            }
            // sheet.workbook.xlsx.writeFile('relatorios/MovimentacaoFinanceira.xlsx');

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "MovimentacaoFinanceira.xlsx"
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        });

    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/relatorio/rendimento', (req, res, next) => {
    if (req.session.loggedin) {
        db.query(`Select F.NM_Nome
                        ,P.DT_Pedido
                        ,P.VL_Valor
                        ,PS.DS_Status
                      From Pedido P
                      Inner Join Funcionario F
                          On P.ID_Funcionario = F.ID_Funcionario
                      Inner Join PedidoStatus PS
                          On P.ID_PedidoStatus = PS.ID_PedidoStatus
                      Where P.ID_PedidoStatus = 2;`, (err, rows, fields) => {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Rendimento por Vendedor');

            sheet.columns = [{
                    header: 'Vendedor',
                    key: 'vendedor'
                },
                {
                    header: 'Data',
                    key: 'data'
                },
                {
                    header: 'Valor',
                    key: 'valor'
                },
                {
                    header: 'Situação',
                    key: 'situ'
                },
            ]

            rows.forEach(item => {
                sheet.addRow({
                    vendedor: item.NM_Nome,
                    data: item.DT_Pedido,
                    valor: item.VL_Valor,
                    situ: item.DS_Status,
                });
            });

            sheet.getRow(1).font = {
                bold: true,
            }

            sheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'FFFB00'
                }
            }
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "RendimentoPorVendedor.xlsx"
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        });

    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/relatorio/produtos', (req, res, next) => {
    if (req.session.loggedin) {
        db.query(`Select    P.NM_Produto
                           ,P.NR_SKU
                           ,P.VL_Preco as Valor_Unitario
                           ,sum(P.ID_Produto) as Quantidade_de_Vendas_Geradas
                           ,sum(D.NR_Quantidade) as Quantidade_Total_Vendido
                           ,sum(D.VL_Total) as Valor_Total_Vendido
                        From Produto P
                        Left Join PedidoDetalhe D
                            On P.ID_Produto = D.ID_Produto
                        Group by P.NM_Produto, P.NR_SKU, P.VL_Preco;`, (err, rows, fields) => {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Vendas por Produto');

            sheet.columns = [{
                    header: 'Produto',
                    key: 'produto'
                },
                {
                    header: 'SKU',
                    key: 'sku'
                },
                {
                    header: 'Valor unitario',
                    key: 'valorU'
                },
                {
                    header: 'Quantidade de vendas geradas',
                    key: 'QTDVendasGeradas'
                },
                {
                    header: 'Quantidade total vendido',
                    key: 'QTDTotal'
                },
                {
                    header: 'Valor total vendido',
                    key: 'VLTotal'
                },
            ]

            rows.forEach(item => {
                sheet.addRow({
                    produto: item.NM_Produto,
                    sku: item.NR_SKU,
                    valorU: item.Valor_Unitario,
                    QTDVendasGeradas: item.Quantidade_de_Vendas_Geradas,
                    QTDTotal: item.Quantidade_Total_Vendido,
                    VLTotal: item.Valor_Total_Vendido,
                });
            });

            sheet.getRow(1).font = {
                bold: true,
            }

            sheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'FFFB00'
                }
            }

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "VendaPorProduto.xlsx"
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        });

    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

module.exports = router;