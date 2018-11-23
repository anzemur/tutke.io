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

/**
 * CREATES lecture and adds its reference to the user.
 * Query parameter: Author's userId.
 * Body: Lecture model.
 */
module.exports.createLecture = (req, res) => {
  if(req.query.userId) {
    req.body.author = mongoose.Types.ObjectId(req.query.userId);
    Lecture.create(req.body)
      .then(lecture => {
        User.updateOne(
          { _id: req.query.userId},
          { $push: { postedLectures: lecture.id } }
        )
        .then(updateRes => {
          respondJson(res, 201, lecture);
        })
        .catch(err=> {
          respondJson(res, 500, 'User update failed:' + err);
        })
      })
      .catch(err => {
        respondJson(res, 500, err);
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};
