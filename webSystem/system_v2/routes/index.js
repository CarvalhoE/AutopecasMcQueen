var express = require('express');
var router = express.Router();

var db = require('../database');

router.post('/authentication', function (req, res, next) {
  var loginUser = req.body.user_login;
  var senhaUser = req.body.user_password;

  db.query('Select * From Funcionario Where DS_Login = ? And NR_Senha = ?', [loginUser, senhaUser], function (err, rows, fields) {
    if (err) throw err;

    if (rows.length <= 0) {
      req.flash('error', 'Usuário/Senha inválido!');
      res.redirect('/login')
    } else {
      req.session.loggedin = true;
      req.session.name = rows[0].NM_Nome;
      req.session.user_id = rows[0].ID_Funcionario;

      res.redirect('/home');
    }
  });
});

router.get('/logout', function (req, res) {
  req.flash('sucess', 'Faça seu login novamente');
  req.session.destroy();
  res.redirect('/login');
});

router.get('/', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('home', {
      name: req.session.name
    });
  } else {
    res.render('login', {
      session: req.session
    });
  }
});

router.get('/login', function (req, res, next) {
  if (req.session.loggedin) {
    res.redirect('/home');
  } else {
    res.render('login', {
      session: req.session
    });
  }
});

module.exports = router;