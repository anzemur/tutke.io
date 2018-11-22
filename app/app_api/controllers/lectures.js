'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Lecture =  mongoose.model('Lecture');

var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all lectures.
 */
module.exports.getLectures = (req, res) => {
  Lecture
    .find()
    .exec((err, lectures) => {
      if(err) {
        respondJson(res, 500, err)
      } else {
        respondJson(res, 200, lectures);
      }
    });
};
