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
          menus: req.session.menus,
          values: req.session.cobrancas
        });
    });
  } else {
    req.flash('success', 'É necessário estar logado para acessar esta página');
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
          menus: req.session.menus,
          values: req.session.cobrancas
        });
    });
  } else {
    req.flash('success', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/financeiro/novaCobranca', function (req, res, next) {
  if (req.session.loggedin) {
    db.query(`Select * From SituacaoCobranca; Select * From TipoCobranca;`, function (err, rows, fields){
      if(err) throw err;

      req.session.situacao  = rows[0];
      req.session.tipo      = rows[1];

      res.render('financeiro/finNovaCobranca', {
        name: req.session.name,
        menus: req.session.menus,
        valuesS: req.session.situacao,
        valuesT: req.session.tipo
      });
    });
  } else {
    req.flash('success', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Cadastrar Pagamentos
router.post('/novaCobranca', function (req, res, next) {
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
      res.redirect('financeiro/recebimentos');
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Alterar Recebimento
router.get('/financeiro/finAlteraCobranca/:id', (req, res, next) => {
  if (req.session.loggedin) {
    let id = req.params.id;
    const query = `Select DS_Descricao
                         ,C.ID_SituacaoCobranca
                         ,C.ID_TipoCobranca
                         ,VL_Valor
                         ,DT_Registro
                         ,DS_SituacaoCobranca
                         ,DS_TipoCobranca
                      From Cobranca C
                      Inner Join TipoCobranca TC
                        On C.ID_TipoCobranca = TC.ID_TipoCobranca
                      Inner Join SituacaoCobranca SC
                        On C.ID_SituacaoCobranca = SC.ID_SituacaoCobranca
                      Where C.ID_Cobranca = ${id}`

    db.query(`${query}; Select * From SituacaoCobranca; Select * From TipoCobranca;`, function (err, rows, fields) {
      if (err) throw err;

      req.session.cobranca = rows[0];
      req.session.situacaoCobranca = rows[1];
      req.session.tipoCobranca = rows[2];

      res.render('financeiro/finAlteraCobranca', {
        name: req.session.name,
        menus: req.session.menus,
        id: id,
        cobranca: req.session.cobranca,
        situacaoCobranca: req.session.situacaoCobranca,
        tipoCobranca: req.session.tipoCobranca
      });
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/alteraCobranca/:id', (req, res, next)=>{
  if(req.session.loggedin){
    let id = req.params.id

    let data = {
      "DS_Descricao":req.body.dsCobranca,
      "VL_Valor":req.body.valorCobranca,
      "ID_SituacaoCobranca": req.body.situacaoCobranca
    }
    db.query(`Update Cobranca Set ? Where ID_Cobranca = ${id}`, [data], (err, ret) => {
        if (err) throw err;
        req.flash('success', "Cobrança alterada com sucesso!")
        res.redirect('/financeiro/recebimentos');
    });

  }else{
    req.flash('message', 'é necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});
module.exports = router;