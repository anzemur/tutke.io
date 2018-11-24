'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all users. TODO: Add sort, pagination, populate, query..
 */
module.exports.getUsers = (req, res) => {
  User
    .find()
    .exec((err, users) => {
      if(err) {
        respondJson(res, 500, err);
        return;
      } else {
        respondJson(res, 200, users);
      }
    });
};

/**
 * GET a user by userId.
 * Path parameter: {string} userId
 * Query parameter: {boolean} populate
 */
module.exports.getUser = (req, res) => {
  if (req.params && req.params.userId) {
    var query = User.findById(req.params.userId);

    if(req.query && req.query.populate) 
      query.populate('postedLectures');

    query.exec((err, user) => {
      if (!user) {
        respondJson(res, 404, errors.NotFound);
        return;
      } else if (err) {
        respondJson(res, 500, err);
        return;
      }
      respondJson(res, 200, user);
    });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};