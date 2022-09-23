var express = require('express');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    session: req.session
  });
});

router.post('/login', function (request, response, next) {
  var user_email_address = request.body.user_email_address;
  var user_password = request.body.user_password;

  if (user_email_address && user_password) {
    query = `
    Select * From Funcionario
      Where DS_Login = "${user_email_address}"
    `;

    db.query(query, function (error, data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].NR_Senha == user_password) {
            request.session.user_id = data[i].ID_Funcionario;

            response.redirect('../views/index2');
          } else {
            response.send('Senha incorreta!')
          }
        }
      } else {
        response.send(`Usuário Incorreto!`);
      }
    });

  } else {
    response.send('Informe seu usuário e senha!');
    response.end();
  }

})

router.get('/logout', function (request, response, next) {
  request.session.destroy();

  response.redirect('/');
});

module.exports = router;