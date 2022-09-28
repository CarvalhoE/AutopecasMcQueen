require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/configuracoes', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('user/configuracoes', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/signup_user', function (req, res, next) {
    if (req.session.loggedin) {
        console.log(carregaDepartamento())
        res.render('user/cadastraFuncionario', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

function carregaDepartamento() {
    // var data = new Object();
    // for (var i = 0; i < 5; i++) {
    //     data[i].id = 1,
    //     data[i].descricao = `teste`
    //     }
    var oi = '1';
    db.query('Select * From Departamento', function(err, rows, fields) {
    if (err) throw err;
        oi = 'oi';

//         this.id = rows[0].DS_Departamento

    });
    return oi;
}

module.exports = router;