var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var financeiroRouter = require('./routes/financeiro');
var configuracoesRouter = require('./routes/configuracoes');
var homeRouter = require('./routes/home');

var app = express();

app.use('/public', express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'autopecas',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(expressValidator());

// app.use('/', indexRouter); Cópia de Segurança
app.use(indexRouter);
app.use(financeiroRouter);
app.use(configuracoesRouter);
app.use(homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // Controllers
// const departamentoController = require('./routes/controllers/departamentoController');

// //Departamentos
// app.get('/departamentos', departamentoController.findAll);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;