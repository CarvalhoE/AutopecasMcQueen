let express = require('express');
const flash = require('express-flash');
let router = express.Router();

let db = require('../database');

//Clientes
router.get('/comercial/clientes', function (req, res, next) {
  if (req.session.loggedin) {
    db.query('Select * From Cliente', function (err, rows, fields) {
      if (err) throw err;
      req.session.clientes = rows;
      res.render('comercial/clientes', {
        name: req.session.name,
        values: req.session.clientes
      });
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/cadastraCliente', function (req, res) {
  if (req.session.loggedin) {
    res.render('comercial/cadastraCliente', {
      name: req.session.name
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Alterar (Concluído) - Clientes
router.get('/comercial/alteraCliente/:id', (req, res, next) => {
  if (req.session.loggedin) {
    let id = req.params.id;

    db.query(`Select * From Cliente Where ID_Cliente = ${id}`, function (err, rows, fields) {
      if (err) throw err;

      req.session.cliente = rows[0]

      res.render('comercial/alteraCliente', {
        name: req.session.name,
        cliente: req.session.cliente,
        id: id
      });
    });

  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/alteraCliente/:id', (req, res, next) => {
  if (req.session.loggedin) {
    let id = req.params.id

    let data = {
      "NM_Nome": req.body.nome,
      "DS_Email": req.body.email,
      "NR_Telefone": req.body.telefone,
    }
    db.query(`Update Cliente Set ? Where ID_Cliente = ${id}`, [data], (err, ret) => {
      if (err) {
        req.flash('error', err)
        res.redirect('/comercial/clientes')
      } else {
        req.flash('success', 'Cliente alterado com sucesso! id = ' + id)
        res.redirect('/comercial/clientes')
      }
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Cadastrar (Concluido) - Clientes
router.post('/cadastrarCliente', (req, res, next) => {
  if (req.session.loggedin) {
    let data = {
      "NM_Nome": req.body.nome,
      "NR_CPF": req.body.cpf,
      "DS_Email": req.body.email,
      "NR_Telefone": req.body.telefone,
      "DT_Nascimento": req.body.nascimento,
      "DT_Cadastro": new Date()
    }

    db.query('Insert Into Cliente Set ?', [data], (err, ret) => {
      if (err) throw err;

      req.flash('message', 'Cadastrado com sucesso!');
      console.log(`${data.NM_Nome} foi cadastrado com sucesso!`)
      res.redirect('/comercial/clientes');
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Deletar (Concluido) - Clientes
router.post('/comercial/clientes/(:id)', function (req, res, next) {
  if (req.session.loggedin) {
    let id = req.body.ID_Cliente;
    db.query(`Delete From Cliente Where ID_Cliente = ?`, id, (err, ret) => {
      if (err) {
        req.flash('error', err)
        res.redirect('/comercial/clientes')
      } else {
        req.flash('success', 'Cliente deletado com sucesso! id = ' + id)
        res.redirect('/comercial/clientes')
      }
    });
  } else {
    req.flash('message', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

//Vendas
router.get('/comercial/vendas', function (req, res) {
  if (req.session.loggedin) {
    let query = `Select P.ID_Pedido
                       ,C.NM_Nome as NM_Cliente
                       ,F.NM_Nome as NM_Vendedor
                       ,P.DT_Pedido
                       ,P.DT_Efetivacao
                       ,P.NR_QtdParcelas
                       ,PS.DS_Status
                       ,P.VL_Valor
                     From Pedido P
                     Inner Join PedidoStatus PS
                         On P.ID_PedidoStatus = PS.ID_PedidoStatus
                     Inner Join Funcionario F
                         On P.ID_Funcionario = F.ID_Funcionario
                     Inner Join Cliente C
                         On P.ID_Cliente = C.ID_Cliente`
    db.query(query, function (err, rows, fields) {
      if (err) throw err;

      req.session.vendas = rows;
      res.render('comercial/vendas', {
        name: req.session.name,
        values: req.session.vendas
      });
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.get('/comercial/VendasNovaVenda', function (req, res) {
  if (req.session.loggedin) {
    db.query(`Select * From Funcionario Where ID_Funcionario = ${req.session.user_id};
              Select * From Cliente;
              Select * From PedidoStatus;
              Select * From FormaPagamento;
              Select * From Produto`, (err, rows, fields) => {

      req.session.funcionario = rows[0];
      req.session.cliente = rows[1];
      req.session.situacao = rows[2];
      req.session.formaPagamento = rows[3];
      req.session.produto = rows[4];

      res.render('comercial/VendasNovaVenda', {
        name: req.session.name,
        funcionario: req.session.funcionario,
        cliente: req.session.cliente,
        situacao: req.session.situacao,
        formaPagamento: req.session.formaPagamento,
        produto: req.session.produto
      });
    })
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
});

router.post('/efetivaNovaVenda', function (req, res) {
  if (req.session.loggedin) {
    let data = {
      ID_Funcionario: req.body.vendedor,
      ID_Cliente: req.body.cliente,
      DT_Pedido: new Date(),
      VL_Valor: req.body.valorTotal,
      ID_PedidoStatus: req.body.situacao,
      DT_Status: new Date(),
      NR_QtdParcelas: req.body.formaPagamento == "1" ? req.body.numeroParcelas : null,
      ID_FormaPagamento: req.body.formaPagamento
    }

    db.query('Insert Into Pedido Set ?', data, (err, rows, fields) => {
      if (err) throw err;

      let insertId = rows.insertId;
      let details = req.body.produtos.split("|");
      details.forEach((obj) => {
        let row = JSON.stringify(obj);
        console.log(row);
        let detail = {
          ID_Pedido: insertId,
          ID_Produto: row.idProduto,
          NR_Quantidade: row.quantidade,
          VL_Unitario: row.valor,
          VL_Total: row.valorTotal,
        }

        db.query('Insert Into PedidoDetalhe Set ?', detail, (err, rows, fields) => {
          if (err) throw err;
        });
      });

      req.flash('message', 'Venda cadastrada com sucesso!');
      res.redirect('/comercial/vendas');
    });
  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login');
  }
});

router.get('/novaVenda/adicionaProduto', (req, res) => {
  if (req.session.loggedin) {


  } else {
    req.flash('sucess', 'É necessário estar logado para acessar esta página');
    res.redirect('/login')
  }
})

module.exports = router;