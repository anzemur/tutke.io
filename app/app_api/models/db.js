'use strict';
var mongoose = require('mongoose');
var dbURI = getDbUri();
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });

/** Mongoose connected **/
mongoose.connection.on('connected', function() {
  console.log('Mongoose is connected on: ' + dbURI);
});
  
/** Mongoose error **/
mongoose.connection.on('error', function(err) {
  console.log('Mongoose encountered an error:: ' + err);
});
  
/** Mongoose disconnected **/
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose is disconnected.');
});

/** Handles SIGUSR2 when nodemon restart **/
process.once('SIGUSR2', function() {
  closedConnection('Application restart (nodemon).', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

/** Handles SIGINT after application exit **/
process.on('SIGINT', function() {
  closedConnection('Application exit.', function() {
    process.exit(0);
  });
});

/** Handles SIGUTERM after application exit on Heroku **/
process.on('SIGTERM', function() {
  closedConnection('Application exit (Heroku).', function() {
    process.exit(0);
  });
});

/**
 * Parses the right reason on mongoose exit.
 * @param {*} msg 
 * @param {*} callback 
 */
var closedConnection = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose closed connection because of: ' + msg);
    callback();
  });
};

/**
 * Return dbUri based on environment.
 */
function getDbUri() {
  return process.env.NODE_ENV === 'production' ? process.env.MLAB_URI : 'mongodb://localhost/tutkeDev';
}