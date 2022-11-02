let express = require('express');
const flash = require('express-flash');
let router = express.Router();

let db = require('../database');

//Clientes
router.get('/comercial/clientes', function (req, res, next) {
  if (req.session.loggedin) {
    db.query('Select * From Cliente', function (err, rows, fields) {
      if (err) throw err;
      req.session.clientes = rows;
      res.render('comercial/clientes', {
        name: req.session.name,
        values: req.session.clientes
      });
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/cadastraCliente', function (req, res) {
  if (req.session.loggedin) {
    res.render('comercial/cadastraCliente', {
      name: req.session.name
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Alterar (Concluído) - Clientes
router.get('/comercial/alteraCliente/:id', (req, res) => {
  if (req.session.loggedin) {
    let id = req.params.id;

    db.query(`Select * From Cliente Where ID_Cliente = ${id}`, function (err, rows, fields) {
      if (err) throw err;

      req.session.cliente = rows[0]
      
      res.render('comercial/alteraCliente', {
        name: req.session.name,
        cliente: req.session.cliente,
        id: id
      });
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

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

//Cadastrar (Concluido) - Clientes
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

//Deletar (Concluido) - Clientes
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

//Vendas
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
    db.query(`Select * From Funcionario;
              Select * From Cliente;
              Select * From PedidoStatus;
              Select * From FormaPagamento;
              Select * From Produto Where FL_Disponivel = 1`, (err, rows, fields) => {

      req.session.funcionario = rows[0];
      req.session.cliente = rows[1];
      req.session.situacao = rows[2];
      req.session.formaPagamento = rows[3];
      req.session.produto = rows[4];

      res.render('comercial/VendasNovaVenda', {
        name: req.session.name,
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
    res.render('comercial/comprasNovaCompra', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/novaVenda/adicionaProduto', (req, res) => {
  if (req.session.loggedin) {


  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
  // if (req.session.arrayProdutos == 0) {
  //   let arrayProdutos = new Array();
  //   arrayProdutos.push()
  // }

  // console.log('ooi');
})

module.exports = router;