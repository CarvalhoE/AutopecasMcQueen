let express = require('express');
let router = express.Router();

router.get('/financeiro/recebimentos', function (req, res) {
  if (req.session.loggedin) {
    res.render('financeiro/finRecebimentos', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/financeiro/pagamentos', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('financeiro/finPagamentos', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/financeiro/novoPagamento', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('financeiro/finNovoPagamento', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/financeiro/novoRecebimento', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('financeiro/finNovoRecebimento', {
      name: req.session.name
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

module.exports = router;