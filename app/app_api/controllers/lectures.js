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
        return;
      } else {
        respondJson(res, 200, lectures);
      }
    });
};

/**
 * GET a user by lectureId.
 * Path parameter: lectureId
 */
module.exports.getLecture = (req, res) => {
  if (req.params && req.params.lectureId) {
    Lecture
      .findById(req.params.lectureId)
      .exec((err, lecture) => {
        if (!lecture) {
          respondJson(res, 404, errors.NotFound);
          return;
        } else if (err) {
          respondJson(res, 500, err);
          return;
        }
        respondJson(res, 200, lecture);
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureId');
  }
};

/**
 * CREATES lecture and adds its reference to the user.
 * Query parameter: Author's userId.
 * Body: Lecture model.
 */
module.exports.createLecture = (req, res) => {
  if(req.query && req.query.userId) {
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
          return;
        })
      })
      .catch(err => {
        respondJson(res, 500, err);
        return;
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};


/**
 * DELETES lecture and adds its reference from the user.
 * Query parameter: Author's userId.
 * Path parameter: lectureId
 */
module.exports.deleteLecture = (req, res) => {
  if(req.query && req.query.userId) {
    if (req.params && req.params.lectureId) {
      Lecture.findByIdAndDelete(req.params.lectureId)
        .then(delRes => {
          User.updateOne(
            { _id: req.query.userId},
            { $pull: { postedLectures: mongoose.Types.ObjectId(req.params.lectureId) } }
          )
          .then(updateRes => {
            respondJson(res, 204, null);
          })
          .catch(err=> {
            respondJson(res, 500, 'User update failed:' + err);
            return;
          })
        })
        .catch(err => {
          respondJson(res, 500, err);
          return;
        });
    } else {
      respondJson(res, 400, errors.BadRequest + 'lectureId');
    }
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};
