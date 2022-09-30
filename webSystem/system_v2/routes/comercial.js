let express = require('express');
let router = express.Router();

let db = require('../database');

router.get('/comercial/clientes', function (req, res, next) {
  if (req.session.loggedin) {
    db.query('Select * From Funcionario', function (err, rows, fields) {
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
    res.render('comercial/vendas', {
      name: req.session.name
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
    res.render('comercial/compras', {
      name: req.session.name
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