let express = require('express');
let router = express.Router();

router.get('/tecnica/fornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/fornecedores', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/produtos', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/produtos', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/relatorios', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/relatorios', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/notas', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/nfe', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/configuracoes', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/configuracoes', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/cadastraFornecedor', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/cadastraFornecedor', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/signup_user', function (req, res, next) {
    if (req.session.loggedin) {
        console.log(carregaDepartamento())
        res.render('tecnica/cadastraFuncionario', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

router.get('/tecnica/perfil', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('tecnica/perfil', {
            name: req.session.name
        });
    } else {
        req.flash('sucess', 'É necessário estar logado para acessar esta página');
        res.redirect('/login')
    }
});

module.exports = router;