'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('./helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all users. TODO: Add sort, pagination, populate, query..
 */
module.exports.getUsers = (req, res) => {
  User
    .find()
    .exec((err, users) => {
      if(err) {
        respondJson(res, 500, err)
      } else {
        respondJson(res, 200, users);
      }
    });
};

/**
 * GET a user based on userId.
 * Query param: userId
 */
module.exports.getUser = (req, res) => {
  if (req.params && req.params.userId) {
    User
      .findById(req.params.userId)
      .exec((err, user) => {
        if (!user) {
          respondJson(res, 404, errors.NotFound)
        } else if (err) {
          respondJson(res, 500, err)
        }
        respondJson(res, 200, user);
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};