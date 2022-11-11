let express = require('express');
let router = express.Router();
let db = require('../database');

//#region Clientes
router.get('/comercial/clientes', function (req, res, next) {
  if (req.session.loggedin) {
    db.query('Select * From Cliente', function (err, rows, fields) {
      if (err) throw err;
      req.session.clientes = rows;
      res.render('comercial/clientes', {
        name: req.session.name,
        menus: req.session.menus,
        values: req.session.clientes
      });
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Cadastrar - Clientes
router.get('/comercial/cadastraCliente', function (req, res) {
  if (req.session.loggedin) {
    res.render('comercial/cadastraCliente', {
      name: req.session.name,
      menus: req.session.menus
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Alterar - clientes
router.get('/comercial/alteraCliente/:id', (req, res) => {
  if (req.session.loggedin) {
    let id = req.params.id;

    db.query(`Select * From Cliente Where ID_Cliente = ${id}`, function (err, rows, fields) {
      if (err) throw err;

      req.session.cliente = rows[0]

      res.render('comercial/alteraCliente', {
        name: req.session.name,
        menus: req.session.menus,
        cliente: req.session.cliente,
        id: id
      });
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Alterar - Clientes
router.post('/alteraCliente/:id', (req, res, next) => {
  if (req.session.loggedin) {
    let id = req.params.id

    let data = {
      "NM_Nome": req.body.nome,
      "DS_Email": req.body.email,
      "NR_Telefone": req.body.telefone,
    }
    db.query(`Update Cliente Set ? Where ID_Cliente = ${id}`, [data], (err, ret) => {
      if (err) {
        req.flash('error', err)
        res.redirect('/comercial/clientes')
      } else {
        req.flash('success', 'Cliente alterado com sucesso! id = ' + id)
        res.redirect('/comercial/clientes')
      }
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Cadastrar - Clientes
router.post('/cadastrarCliente', (req, res, next) => {
  if (req.session.loggedin) {
    let data = {
      "NM_Nome": req.body.nome,
      "NR_CPF": req.body.cpf,
      "DS_Email": req.body.email,
      "NR_Telefone": req.body.telefone,
      "DT_Nascimento": req.body.nascimento,
      "DT_Cadastro": new Date()
    }

    db.query('Insert Into Cliente Set ?', [data], (err, ret) => {
      if (err) throw err;

      req.flash('message', 'Cadastrado com sucesso!');
      console.log(`${data.NM_Nome} foi cadastrado com sucesso!`)
      res.redirect('/comercial/clientes');
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Remover - Clientes
router.post('/comercial/clientes/:id', function (req, res, next) {
  if (req.session.loggedin) {
    let id = req.params.id;
    db.query(`Delete From Cliente Where ID_Cliente = ?`, id, (err, ret) => {
      if (err) {
        req.flash('error', err)
        res.redirect('/comercial/clientes')
      } else {
        req.flash('success', 'Cliente deletado com sucesso! id = ' + id)
        res.redirect('/comercial/clientes')
      }
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});
//#endregion

//#region Vendas
router.get('/comercial/vendas', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select P.ID_Pedido
                       ,C.NM_Nome as NM_Cliente
                       ,F.NM_Nome as NM_Vendedor
                       ,P.DT_Pedido
                       ,P.DT_Efetivacao
                       ,P.NR_QtdParcelas
                       ,P.VL_Valor
                       ,PS.DS_Status
                     From Pedido P
                     Inner Join PedidoStatus PS
                         On P.ID_PedidoStatus = PS.ID_PedidoStatus
                     Inner Join Funcionario F
                         On P.ID_Funcionario = F.ID_Funcionario
                     Inner Join Cliente C
                         On P.ID_Cliente = C.ID_Cliente`
    db.query(query, function (err, rows, fields) {
      if (err) throw err;

      req.session.vendas = rows;
      res.render('comercial/vendas', {
        name: req.session.name,
        menus: req.session.menus,
        values: req.session.vendas
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/VendasNovaVenda', function (req, res) {
  if (req.session.loggedin) {
    db.query(`Select * From Funcionario Where ID_Funcionario = ${req.session.user_id};
              Select * From Cliente;
              Select * From PedidoStatus;
              Select * From FormaPagamento Where FL_Ativo = 1;
              Select * From Produto Where FL_Disponivel = 1`, (err, rows, fields) => {

      req.session.funcionario = rows[0];
      req.session.cliente = rows[1];
      req.session.situacao = rows[2];
      req.session.formaPagamento = rows[3];
      req.session.produto = rows[4];

      res.render('comercial/VendasNovaVenda', {
        name: req.session.name,
        menus: req.session.menus,
        funcionario: req.session.funcionario,
        cliente: req.session.cliente,
        situacao: req.session.situacao,
        formaPagamento: req.session.formaPagamento,
        produto: req.session.produto
      });
    })
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/efetivaNovaVenda', function (req, res) {
  if (req.session.loggedin) {
    let data = {
      ID_Funcionario: req.body.vendedor,
      ID_Cliente: req.body.cliente,
      DT_Pedido: new Date(),
      VL_Valor: req.body.valorTotal,
      ID_PedidoStatus: req.body.situacao,
      DT_Efetivacao: null,
      DT_Status: new Date(),
      NR_QtdParcelas: req.body.formaPagamento == "1" ? req.body.numeroParcelas : null,
      ID_FormaPagamento: req.body.formaPagamento
    }

    if (data.ID_PedidoStatus == 2) {
      data.DT_Efetivacao = new Date();

      //Atualização do controle financeiro
      let financialData = {
        DS_Descricao: "Realização de venda",
        DT_Registro: data.DT_Pedido,
        ID_TipoCobranca: 2,
        VL_Valor: data.VL_Valor,
        ID_SituacaoCobranca: 1
      }
      db.query(`Insert Into Cobranca Set ? `, financialData, (error, results, data) => {
        if (error) throw error;
      });
    }

    db.query('Insert Into Pedido Set ?', data, (err, rows, fields) => {
      if (err) throw err;

      let insertId = rows.insertId;
      let details = JSON.parse(req.body.produtos);

      details.forEach(item => {
        let detail = {
          ID_Pedido: insertId,
          ID_Produto: item.id,
          NR_Quantidade: item.quantidade,
          VL_Unitario: item.valor,
          VL_Total: item.valorTotal,
        }

        db.query('Insert Into PedidoDetalhe Set ?;', detail, (error, results, data) => {
          if (error) throw error;
        });

        //Atualização do estoque
        db.query(`Update Produto Set NR_Quantidade = NR_Quantidade - ${detail.NR_Quantidade}
                                                    ,FL_Disponivel = Case 
                                                                         When NR_Quantidade - ${detail.NR_Quantidade} <= 0 Then 0
                                                                         Else 1
                                                                     End
                      Where ID_Produto = ${detail.ID_Produto};`, (error, results, data) => {
          if (error) throw error;
        });
      });
      req.flash('message', 'Venda cadastrada com sucesso!');
      res.redirect('/comercial/vendas');
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});

router.get('/comercial/alteraVenda/(:id)', function (req, res) {
  if (req.session.loggedin) {
    const id = req.params.id;
    let query = `Select P.*
                       ,F.NM_Nome as NM_Funcionario
                       ,C.NM_Nome as NM_Cliente
                     From Pedido P
                     Inner Join Funcionario F
                         On P.ID_Funcionario = F.ID_Funcionario
                     Inner Join Cliente C
                         On P.ID_Cliente = C.ID_Cliente
                     Where P.ID_Pedido = ${id};
                     Select * From PedidoStatus;
                     Select * From FormaPagamento Where FL_Ativo = 1;`

    db.query(query, (err, rows, fields) => {
      req.session.pedido = rows[0];
      req.session.status = rows[1];
      req.session.formaPagamento = rows[2];

      res.render('comercial/alteraVenda', {
        name: req.session.name,
        menus: req.session.menus,
        pedido: req.session.pedido,
        status: req.session.status,
        formaPagamento: req.session.formaPagamento
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/alteraVenda/(:id)', function (req, res) {
  if (req.session.loggedin) {
    const id = req.params.id;

    db.query(`Select * From Pedido P Where P.ID_Pedido = ${id};`, (err, rows, fields) => {
      let data = {
        ID_FormaPagamento: req.body.formaPagamento,
        NR_QtdParcelas: req.body.numeroParcelas,
        ID_PedidoStatus: req.body.situacao,
        DT_Status: rows[0].DT_Status,
        DT_Efetivacao: rows[0].DT_Efetivacao
      }

      if (rows[0].ID_PedidoStatus != data.ID_PedidoStatus) {
        data.DT_Status = new Date();
        if (data.ID_PedidoStatus == 2) {
          data.DT_Efetivacao = new Date();

          //Atualização do controle financeiro
          let financialData = {
            DS_Descricao: "Realização de venda",
            DT_Registro: data.DT_Efetivacao,
            ID_TipoCobranca: 2,
            VL_Valor: rows[0].VL_Valor,
            ID_SituacaoCobranca: 1
          }
          db.query(`Insert Into Cobranca Set ? `, financialData, (error, results, data) => {
            if (error) throw error;
          });
        }
      }

      if (rows[0].ID_FormaPagamento != data.ID_FormaPagamento && data.ID_FormaPagamento != "1") {
        data.NR_QtdParcelas = null;
      }

      db.query(`Update Pedido Set ? Where ID_Pedido = ${id}`, [data], (error, ret) => {
        if (error) {
          req.flash('error', error)
        } else {
          req.flash('success', 'Pedido alterado');
        }
        data = null;
        res.redirect('/comercial/vendas');
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/vendaDetalhe/(:id)', (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    let query = `Select P.*
                ,F.NM_Nome as NM_Funcionario
                ,C.NM_Nome as NM_Cliente
                ,C.NR_Telefone as NR_TelefoneCliente
                ,C.NR_CPF as NR_CPFCliente
                ,S.DS_Status
                ,G.DS_FormaPagamento
              From Pedido P
              Inner Join Funcionario F
                On P.ID_Funcionario = F.ID_Funcionario
              Inner Join Cliente C
                On P.ID_Cliente = C.ID_Cliente
              Inner Join PedidoStatus S
                On P.ID_PedidoStatus = S.ID_PedidoStatus
              Inner Join FormaPagamento G
                On P.ID_FormaPagamento = G.ID_FormaPagamento
              Where P.ID_Pedido = ${id};
              Select D.NR_Quantidade
                    ,D.VL_Unitario
                    ,D.VL_Total
                    ,R.ID_Produto
                    ,R.NM_Produto
                    ,R.NR_SKU
                From PedidoDetalhe D
                Inner Join Produto R
                    On D.ID_Produto = R.ID_Produto
                Where ID_Pedido = ${id}`
    db.query(query, (err, rows, fields) => {
      req.session.values = rows[0];
      req.session.produtos = rows[1];

      res.render('comercial/detalheVenda', {
        name: req.session.name,
        menus: req.session.menus,
        values: req.session.values,
        produtos: req.session.produtos,
        id: id
      });
    });
  } else {
    req.flash('sucess', 'Ë necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});
//#endregion

//#region Compras
router.get('/comercial/compras', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select C.ID_Compra
                       ,F.NM_Nome as NM_Funcionario
                       ,FO.NM_Empresa
                       ,Date_Format(DT_Compra, '%d/%m/%Y') as DT_Compra
                       ,FP.DS_FormaPagamento
                       ,CS.DS_Situacao
                       ,C.VL_ValorTotal
                     From Compra as C
                       Inner Join CompraSituacao as CS
                       On C.ID_CompraSituacao = CS.ID_CompraSituacao
                     Inner Join Funcionario as F
                       On C.ID_Funcionario = F.ID_Funcionario
                     Inner Join Fornecedor as FO
                       On C.ID_Fornecedor = FO.ID_Fornecedor
                     Inner Join FormaPagamento as FP
                       On C.ID_FormaPagamento = FP.ID_FormaPagamento`
    db.query(query, function (err, rows, fields) {
      if (err) throw err;

      req.session.compras = rows;
      res.render('comercial/compras', {
        name: req.session.name,
        menus: req.session.menus,
        values: req.session.compras
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/comprasNovaCompra', function (req, res) {
  if (req.session.loggedin) {
    db.query(`Select * From Funcionario;
              Select * From Fornecedor;
              Select * From CompraSituacao;
              Select * From FormaPagamento;
              Select * From Produto`, (err, rows, fields) => {

      req.session.funcionario = rows[0];
      req.session.fornecedor = rows[1];
      req.session.situacao = rows[2];
      req.session.formaPagamento = rows[3];
      req.session.produto = rows[4];

      res.render('comercial/comprasNovaCompra', {
        name: req.session.name,
        menus: req.session.menus,
        funcionario: req.session.funcionario,
        fornecedor: req.session.fornecedor,
        situacao: req.session.situacao,
        formaPagamento: req.session.formaPagamento,
        produto: req.session.produto
      });
    })
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/novaCompra', function (req, res) {
  if (req.session.loggedin) {
    let data = {
      VL_ValorTotal: req.body.valorTotal,
      ID_CompraSituacao: req.body.situacao,
      DT_Compra: new Date(),
      ID_Funcionario: req.body.responsavel,
      ID_Fornecedor: req.body.fornecedor,
      ID_FormaPagamento: req.body.formaPagamento
    }

    db.query('Insert Into Compra Set ?', data, (err, rows, fields) => {
      if (err) throw err;

      //Atualização do controle financeiro
      if (data.ID_CompraSituacao == 1) {  
        let financialData = {
          DS_Descricao: "Reabastecimento de estoque",
          DT_Registro: data.DT_Compra,
          ID_TipoCobranca: 1,
          VL_Valor: data.VL_ValorTotal,
          ID_SituacaoCobranca: 1
        }
        db.query(`Insert Into Cobranca Set ? `, financialData, (error, results, data) => {
          if (error) throw error;
        });
      }

      let insertId = rows.insertId;
      let details = JSON.parse(req.body.produtos);

      details.forEach(item => {
        let detail = {
          ID_Compra: insertId,
          ID_Produto: item.id,
          NR_Quantidade: item.quantidade,
          VL_ValorUnitario: item.valor,
          VL_Total: item.valorTotal,
        }

        db.query('Insert Into CompraDetalhe Set ?;', detail, (error, results, data) => {
          if (error) throw error;
        });

        //Atualização do estoque
        db.query(`Update Produto Set NR_Quantidade = NR_Quantidade + ${detail.NR_Quantidade}
                                                    ,FL_Disponivel = Case 
                                                                         When NR_Quantidade + ${detail.NR_Quantidade} <= 0 Then 0
                                                                         Else 1
                                                                     End
                      Where ID_Produto = ${detail.ID_Produto};`, (error, results, data) => {
          if (error) throw error;
        });
      });
      req.flash('message', 'Compra efetuada com sucesso!');
      res.redirect('/comercial/compras');
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});

router.get('/comercial/alteraCompra/(:id)', function (req, res) {
  if (req.session.loggedin) {
    const id = req.params.id;
    let query = `Select C.*
                       ,F.NM_Nome as NM_Funcionario
                       ,FO.NM_Empresa as NM_Fornecedor
                     From Compra C
                     Inner Join Funcionario F
                         On C.ID_Funcionario = F.ID_Funcionario
                     Inner Join Fornecedor FO
                         On C.ID_Fornecedor = FO.ID_Fornecedor
                     Where C.ID_Compra = ${id};
                     Select * From CompraSituacao;
                     Select * From FormaPagamento;`

    db.query(query, (err, rows, fields) => {
      req.session.compra = rows[0];
      req.session.situacao = rows[1];
      req.session.formaPagamento = rows[2];

      res.render('comercial/alteraCompra', {
        name: req.session.name,
        menus: req.session.menus,
        compra: req.session.compra,
        situacao: req.session.situacao,
        formaPagamento: req.session.formaPagamento
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/alteraCompra/(:id)', function (req, res) {
  if (req.session.loggedin) {
    const id = req.params.id;
    db.query(`Select * From Compra C Where C.ID_Compra = ${id};`, (err, rows, fields) => {
      let data = {
        ID_FormaPagamento: req.body.formaPagamento,
        ID_CompraSituacao: req.body.situacao,
        DT_Compra: rows[0].DT_Compra,
      }


      if (rows[0].ID_CompraSituacao != data.ID_CompraSituacao && (data.ID_CompraSituacao == 1 || data.ID_CompraSituacao == 3)) {
        data.DT_Compra = new Date();
        
        //Atualização do controle financeiro
        let financialData = {
          DS_Descricao: "Reabastecimento de estoque",
          DT_Registro: data.DT_Compra,
          ID_TipoCobranca: 1,
          VL_Valor: rows[0].VL_ValorTotal,
          ID_SituacaoCobranca: 1
        }
        db.query(`Insert Into Cobranca Set ? `, financialData, (error, results, data) => {
          if (error) throw error;
        });
      }

      db.query(`Update Compra Set ? Where ID_Compra = ${id}`, [data], (error, ret) => {
        if (error) {
          req.flash('error', error)
        } else {
          req.flash('success', 'Compra alterada');
        }
        data = null;
        res.redirect('/comercial/compras');
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/compraDetalhe/(:id)', (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    let query = `Select C.*
                ,U.NM_Nome as NM_Funcionario
                ,S.DS_Situacao
                ,G.DS_FormaPagamento
                ,F.NM_Empresa
                From Compra C
                Inner Join Funcionario U
                  On C.ID_Funcionario = U.ID_Funcionario
                Inner Join CompraSituacao S
                  On C.ID_CompraSituacao = S.ID_CompraSituacao
                Inner Join FormaPagamento G
                  On C.ID_FormaPagamento = G.ID_FormaPagamento
                Inner Join Fornecedor F
                  On C.ID_Fornecedor = F.ID_Fornecedor
                Where C.ID_Compra = ${id};
              
                Select D.NR_Quantidade
                      ,D.ID_Produto
                      ,D.VL_Total
                      ,D.VL_ValorUnitario
                      ,R.NM_Produto
                      ,NR_SKU
                From CompraDetalhe D
                Inner Join Produto R
                  On D.ID_Produto = R.ID_Produto
                Where D.ID_Compra = ${id}`
    db.query(query, (err, rows, fields) => {
      req.session.values = rows[0];
      req.session.values2 = rows[1];

      res.render('comercial/detalheCompra', {
        name: req.session.name,
        menus: req.session.menus,
        values: req.session.values,
        values2: req.session.values2,
        id: id
      });
    });
  } else {
    req.flash('sucess', 'Ë necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});
//#endregion

module.exports = router;