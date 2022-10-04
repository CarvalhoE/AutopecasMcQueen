let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let flash = require('express-flash');
let session = require('express-session');

const Swal = require('sweetalert2')

const bodyParser = require('body-parser');

let indexRouter =       require('./routes/index');
let homeRouter =        require('./routes/home');
let comercialRouter =   require('./routes/comercial');
let financeiroRouter =  require('./routes/financeiro');
let tecnicaRouter =     require('./routes/tecnica');
const { application } = require('express');

let app = express();

app.use('/public', express.static('public'));

// view engine setup
app.set('views', [__dirname + '/views', __dirname + '/views/comercial', __dirname + '/views/financeiro', __dirname + '/views/tecnica']);
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
  cookie: { maxAge: 990000 }
}));

app.use(flash());
app.use(expressValidator());

// app.use('/', indexRouter); Cópia de Segurança
app.use(indexRouter);
app.use(homeRouter);
app.use(comercialRouter);
app.use(financeiroRouter);
app.use(tecnicaRouter);

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