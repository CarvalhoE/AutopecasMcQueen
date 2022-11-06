let express = require('express');
let router = express.Router();

let db = require('../database');

router.post('/authentication', function (req, res, next) {
  let loginUser = req.body.user_login;
  let senhaUser = req.body.user_password;
  
  db.query('Select * From Funcionario Where DS_Login = ? And NR_Senha = ?', [loginUser, senhaUser], function (err, rows, fields) {
    if (err) throw err;

    if (rows.length <= 0) {
      req.flash('message', 'Usuário/Senha inválido!');
      req.flash('status', 'error');
      console.log()
      res.redirect('/login')
    } else {
      if(rows[0].FL_Habilitado == 1){
        req.session.loggedin = true;
        req.session.name = rows[0].NM_Nome;
        req.session.user_id = rows[0].ID_Funcionario;
        req.session.perfil_id = rows[0].ID_Perfil;

        res.redirect('/home');
      }else{
        req.flash('message', 'Usuário Desabilitado');
        req.flash('status', 'error');
        res.redirect('/login');
      }
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
      name: req.session.name,
      menus: req.session.menus,
      namef: req.session.namef
    });
  } else {
    res.render('login', {
      message: req.flash('message'),
      status: req.flash('status'),
      session: req.session
    });
  }
});

router.get('/login', function (req, res, next) {
  if (req.session.loggedin) {
    res.redirect('/home'); 
  } else {
    res.render('login', {
      message: req.flash('message'),
      status: req.flash('status'),
      session: req.session
    });
  }
});

module.exports = router;