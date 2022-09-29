var express = require('express');
var router = express.Router();

router.get('/financeiro', function (req, res, next) {
    if (req.session.loggedin) {
      res.render('financeiro/finRecebimentos', {
        name: req.session.name
      });
    } else {
      req.flash('sucess', 'É necessário estar logado para acessar esta página');
      res.redirect('/login')
    }
  });

module.exports = router;