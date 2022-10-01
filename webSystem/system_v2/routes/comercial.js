let express = require('express');
let router = express.Router();

let db = require('../database');

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
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/cadastraCliente', function (req, res) {
  if (req.session.loggedin) {
    res.render('comercial/cadastraCliente', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/vendas', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select P.ID_Pedido
                       ,C.NM_Nome as NM_Cliente
                       ,F.NM_Nome as NM_Vendedor
                       ,P.DT_Pedido
                       ,P.DT_Efetivacao
                       ,P.NR_QtdParcelas
                       ,PS.DS_Status
                       ,P.VL_Final
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
    res.render('comercial/VendasNovaVenda', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/compras', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select C.ID_Compra
                       ,F.NM_Nome as NM_Funcionario
                       ,FO.NM_Nome as NM_Fornecedor
                       ,C.DT_Compra
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

//Data
// router.get('/carregaClientes', function (req, res, next) {

//   db.query('Select * From Funcionario', function (err, rows, fields) {
//     if (err) throw err;

//       req.session.clientes = rows;
//       //res.render('/clientes',{values:require.session.users});
//       console.log(rows)
//       // res.redirect('/comercial/clientes');
//   });
// });

// router.get('/comercial/clientes', function (req, res, next) {
//   if (req.session.loggedin) {
//     db.query('Select * From Funcionario Where DS_Login = ? And NR_Senha = ?', [loginUser, senhaUser], function (err, rows, fields) {
//       if (err) throw err;

//       if (rows.length <= 0) {
//         req.flash('error', 'Usuário/Senha inválido!');
//         res.redirect('/login')
//       } else {
//         req.session.loggedin = true;
//         req.session.name = rows[0].NM_Nome;
//         req.session.user_id = rows[0].ID_Funcionario;

//         res.redirect('/home');
//       }
//     });
//     res.render('comercial/clientes', {
//       name: req.session.name,
//       data:
//     });
//   } else {
//     req.flash('sucess', 'É necessário estar logado para acessar esta página');
//     res.redirect('/login')
//   }
// });

//  router.get('/comercial/clientes', function (req, res, next) {
//    db.query('Select * From Funcionario', function (err, data) {

//      if (err) throw err;

//      res.render('Funcionario', {
//        sampleData: data
//      })

//    });

//  });


module.exports = router;