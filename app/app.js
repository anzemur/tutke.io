'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uglifyJs = require('uglify-js');
var fs = require('fs');

var mergedCode = uglifyJs.minify({
  'app.js': fs.readFileSync('app_client/app.js', 'utf-8'),
  'foot.directive.js': fs.readFileSync('app_client/shared/directives/foot/foot.directive.js', 'utf-8'),
  'nav.directive.js': fs.readFileSync('app_client/shared/directives/nav/nav.directive.js', 'utf-8'),
});

/* Save merged code to new file: */ 
fs.writeFile('public/angular/tutke.min.js', mergedCode.code, (error) => {
  if (error)
    console.log(error);
  else
    console.log('Script is generated and saved as "tutke.min.js".');
});

/* Connect to db. */
require('./app_api/models/db');

var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// app.use('/', indexRouter);

/* API routing */
app.use('/api', indexApi);

/* Angular APP routing */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* Error handler */
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
