'use strict';

require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uglifyJs = require('uglify-es');
var fs = require('fs');
var passport = require('passport');

/* Minify code into one .min file */
var mergedCode = uglifyJs.minify({
  'app.js'                                : fs.readFileSync('app_client/app.js', 'utf-8'),
  /* Directives */
  'foot.directive.js'                     : fs.readFileSync('app_client/shared/directives/foot/foot.directive.js', 'utf-8'),
  'navigation.directive.js'               : fs.readFileSync('app_client/shared/directives/navigation/navigation.directive.js', 'utf-8'),
  /* Services */
  'authentication.service.js'             : fs.readFileSync('app_client/shared/services/authentication.service.js', 'utf-8'),
  'lectures.service.js'                   : fs.readFileSync('app_client/shared/services/lectures.service.js', 'utf-8'),
  'lecture-requests.service.js'           : fs.readFileSync('app_client/shared/services/lecture-requests.service.js', 'utf-8'),
  'user.service.js'                       : fs.readFileSync('app_client/shared/services/user.service.js', 'utf-8'),
  'admin.service.js'                      : fs.readFileSync('app_client/shared/services/admin.service.js', 'utf-8'),
  'daily-quote.service.js'                : fs.readFileSync('app_client/shared/services/daily-quote.service.js', 'utf-8'),
  /* Controllers */
  'index.controller.js'                   : fs.readFileSync('app_client/index/index.controller.js', 'utf-8'),
  'log-in.controller.js'                  : fs.readFileSync('app_client/authentication/log-in/log-in.controller.js', 'utf-8'),
  'registration.controller.js'            : fs.readFileSync('app_client/authentication/registration/registration.controller.js', 'utf-8'),
  'add-comment-modal-pop-up.controller.js': fs.readFileSync('app_client/add-comment-modal-pop-up/add-comment-modal-pop-up.controller.js', 'utf-8'),
  'user-preview.controller.js'            : fs.readFileSync('app_client/user-preview/user-preview.controller.js', 'utf-8'),
  'profile.controller.js'                 : fs.readFileSync('app_client/profile/profile.controller.js', 'utf-8'),
  'navigation.controller.js'              : fs.readFileSync('app_client/shared/directives/navigation/navigation.controller.js', 'utf-8'),
  'add-lecture-pop-up.controller.js'      : fs.readFileSync('app_client/add-lecture-pop-up/add-lecture-pop-up.controller.js', 'utf-8'),
  'edit-user-pop-up.controller.js'        : fs.readFileSync('app_client/edit-user-pop-up/edit-user-pop-up.controller.js', 'utf-8'),
  'db-admin-panel.controller.js'          : fs.readFileSync('app_client/db-admin-panel/db-admin-panel.controller.js', 'utf-8'),
  /* Filters */
  'students-lecture-requests.filter.js'   : fs.readFileSync('app_client/shared/filters/students-lecture-requests.filter.js', 'utf-8'),
  'tutors-lecture-requests.filter.js'     : fs.readFileSync('app_client/shared/filters/tutors-lecture-requests.filter.js', 'utf-8'),
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
/* Register passport config */
require('./app_api/config/passport');

// var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');

var app = express();

/* View engine setup */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

/* Allow CORS */
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Headers", "X-Frame-Options");
//   next();
// });

// app.use('/', indexRouter);

/* API routing */
app.use('/api', indexApi);

/* Angular APP routing */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

/* Catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* Handle unauthorized error 401 */
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      'status': 401,
      'message': err.name + ": " + err.message
    });
  }
});

/* Error handler */
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
