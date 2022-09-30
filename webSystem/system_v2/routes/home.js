let express = require('express');
let router = express.Router();

router.get('/home', function (req, res, next) {
    if (req.session.loggedin) {
      res.render('home', {
        name: req.session.name
      });
    } else {
      req.flash('sucess', 'É necessário estar logado para acessar esta página');
      res.redirect('/login')
    }
  });

module.exports = router;