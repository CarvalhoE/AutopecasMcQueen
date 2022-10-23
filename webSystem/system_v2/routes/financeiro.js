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
                         On C.ID_SituacaoCobranca = SC.ID_SituacaoCobranca`
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
    db.query(`Select * From SituacaoCobranca; Select * From TipoCobranca;`, function (err, rows, fields){
      if(err) throw err;

      req.session.situacao  = rows[0];
      req.session.tipo      = rows[1];

      res.render('financeiro/finNovoRecebimento', {
        name: req.session.name,
        valuesS: req.session.situacao,
        valuesT: req.session.tipo
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/novoRecebimento', function (req, res, next) {
  if (req.session.loggedin) {
    let data = {
      "DS_Descricao":req.body.dsCobranca,
      "DT_Registro":req.body.dataCobranca,
      "ID_TipoCobranca":req.body.tipoCobranca,
      "VL_Valor":req.body.valorCobranca,
      "ID_SituacaoCobranca": req.body.situacaoCobranca
    }

    db.query('Insert Into Cobranca Set ?',[data],(err, result, fields) =>{
      if(err) throw err;

      req.flash('message', 'Cadastrado com sucesso!');
      console.log(`${data.DS_Cobranca} foi cadastrado com sucesso!`)
      res.redirect('financeiro/finRecebimentos');
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});
//Alterar Recebimento
router.get('/financeiro/finAlteraRecebimento/:id', (req, res, next) => {
  if (req.session.loggedin) {
    let id = req.params.id;

    db.query(`Select * From Cobranca Where ID_Cobranca = ${id}`, function (err, rows, fields) {
      if (err) throw err;

      req.session.cobranca = rows[0];

      res.render('financeiro/finAlteraRecebimento', {
        name: req.session.name,
        cobranca: req.session.cobranca,
        valuesS: req.session.situacao,
        valuesT: req.session.tipo,
        id: id
      });
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/finAlteraRecebimento/(:id)', (req, res, next)=>{
  if(req.session.loggedin){
    let id = req.params.id

    let data = {
      "DS_Descricao":req.body.dsCobranca,
      "DT_Registro":req.body.dataCobranca,
      "ID_TipoCobranca":req.body.tipoCobranca,
      "VL_Valor":req.body.valorCobranca,
      "ID_SituacaoCobranca": req.body.situacaoCobranca
    }
    db.query(`Update Cobranca Set ? Where ID_Cobranca = ${id}`, [data], (err, ret) => {
        if (err) throw err;
        req.flash('sucess', "Recebimento Alterado com sucesso!")
        res.redirect('financeiro/finRecebimentos');
    });

  }else{
    req.flash('message', 'é necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});
module.exports = router;