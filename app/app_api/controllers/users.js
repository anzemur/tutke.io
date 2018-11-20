'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUser = function(req, res) {
  User.create()

  respondJson(res, 200, {"status": "uspešno"});
};


/**
 * Api response in JSON format.
 * @param {*} res 
 * @param {*} status 
 * @param {*} data 
 */
var respondJson = function(res, status, data) {
  res.status(status);
  res.json(data);
};
