// Default dependencies from ExpressJS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Added dependencies from package.json
var cors = require("cors");
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');

// Import routers that we created
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRoutes');
var recipeRouter = require('./routes/RecipeRoutes');
var favoriteRouter = require('./routes/FavoriteRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressValidator());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Handle routers that we created
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipeRouter);
app.use('/favorites/', favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Failed!!!')
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
