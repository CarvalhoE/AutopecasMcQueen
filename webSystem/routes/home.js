let express = require('express');
let router = express.Router();

let db = require('../database');

router.get('/home', function (req, res, next) {
    if (req.session.loggedin) {
      let id_perfil = req.session.perfil_id;

      db.query(`Select M.*
                    From MenuPermissao MP
                    Inner Join Menu M
                        On MP.ID_Menu = M.ID_Menu
                    Where MP.ID_Perfil = ${id_perfil}`, (err, rows, fields) => {
                    
        req.session.menus = rows;

        res.render('home', {
          name: req.session.name,
          menus: req.session.menus
        });
      });
    } else {
      req.flash('sucess', 'É necessário estar logado para acessar esta página');
      res.redirect('/login')
    }
  });

module.exports = router;