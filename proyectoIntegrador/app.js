var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registration');
var loginRouter = require('./routes/login');
var perfilRouter = require('./routes/perfil');
var edicionRouter = require('./routes/edicion');
var comentariosRouter = require('./routes/comentarios');
var productosRouter = require('./routes/productos');
var agregarRouter = require('./routes/agregar');
var busqedaRouter = require('./routes/busqueda');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/perfil', perfilRouter);
app.use('/edicion', edicionRouter);
app.use('/comentarios', comentariosRouter);
app.use('/productos', productosRouter);
app.use('/agregar', agregarRouter);
app.use('/busqueda', busqedaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
