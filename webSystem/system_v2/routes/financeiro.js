let express = require('express');
let router = express.Router();

const db = require('../database')

router.get('/financeiro/recebimentos', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select ID_Cobranca
                       ,DS_Descricao
                       ,Date_Format(DT_Registro, '%d/%m/%Y') as DT_Registro
                       ,DS_SituacaoCobranca
                       ,VL_Valor
                     From Cobranca C
                     Inner Join SituacaoCobranca SC
                         On C.ID_SituacaoCobranca = SC.ID_SituacaoCobranca
                     Where ID_TipoCobranca = 2`
    db.query(query, function (err, rows, fields) {
      if (err) throw err;
  
        req.session.cobrancas = rows;
        res.render('financeiro/finRecebimentos', {
          name: req.session.name,
          values: req.session.cobrancas
        });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/financeiro/pagamentos', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select ID_Cobranca
                       ,DS_Descricao
                       ,Date_Format(DT_Registro, '%d/%m/%Y') as DT_Registro
                       ,DS_SituacaoCobranca
                       ,VL_Valor
                     From Cobranca C
                     Inner Join SituacaoCobranca SC
                         On C.ID_SituacaoCobranca = SC.ID_SituacaoCobranca
                     Where ID_TipoCobranca = 1`
    db.query(query, function (err, rows, fields) {
      if (err) throw err;
  
        req.session.cobrancas = rows;
        res.render('financeiro/finPagamentos', {
          name: req.session.name,
          values: req.session.cobrancas
        });
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