'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Lecture =  mongoose.model('Lecture');
var LecturesRequest =  mongoose.model('LecturesRequest');

var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all lectures requests.
 * Query parameter: {boolean} populate
 * Query parameter: {string} status (filter)
 * Query parameter: {string} requestType (filter)
 */
module.exports.getLecturesRequests = (req, res) => {
  var queryOptions = {};

  if(req.query && req.query.status) 
    queryOptions['status'] = req.query.status;
    
  if(req.query && req.query.status) 
    queryOptions['requestType'] = req.query.requestType;

  var query = LecturesRequest.find(queryOptions);
  if(req.query && req.query.populate) {
    query.populate('lecture', 'title');
    query.populate('tutor', 'username');
    query.populate('student', 'username');
  }

  query.exec((err, lecturesRequest) => {
    if(err) {
      respondJson(res, 500, err.message)
      return;
    } else {
      respondJson(res, 200, lecturesRequest);
    }
  });
};

/**
 * GET lecture request by id.
 * Query parameter: {boolean} populate
 * Path parameter: {string} lectureRequestId
 */
module.exports.getLectureRequest = (req, res) => {
  if (req.params && req.params.lectureRequestId) {
    var query = LecturesRequest.findById(req.params.lectureRequestId);

    if(req.query && req.query.populate) {
      query.populate('lecture', 'title');
      query.populate('tutor', 'username');
      query.populate('student', 'username');
    }

    query.exec((err, lecturesRequest) => {
      if(err) {
        respondJson(res, 500, err.message)
        return;
      } else {
        respondJson(res, 200, lecturesRequest);
      }
    });
  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureRequestId');
  }
};

/**
 * CREATES lecture request and adds its reference to tutor and student.
 * Body: {LecturesRequest} LecturesRequest model.
 */
module.exports.createLectureRequest = (req, res) => {
  var tutorId = req.body.tutor;
  var studentId = req.body.student;

  req.body.tutor = mongoose.Types.ObjectId(tutorId);
  req.body.student = mongoose.Types.ObjectId(studentId);
  req.body.lecture = mongoose.Types.ObjectId(req.body.lecture);

  LecturesRequest.create(req.body)
    .then(lecturesRequest => {
      User.updateMany(
        { $or: 
          [
            { _id: tutorId},
            { _id: studentId}
          ]
        },
        { $push: { lecturesRequests: lecturesRequest.id } }
      )
      .then(updateRes => {
        respondJson(res, 201, lecturesRequest);
      })
      .catch(err=> {
        respondJson(res, 500, 'User update failed:' + err.message);
        return;
      })
    })
    .catch(err => {
      respondJson(res, 400, err.message);
      return;
    });
};

/**
 * CREATES lecture request and adds its reference to tutor and student.
 * Body: {LecturesRequest} LecturesRequest model.
 * Query parameter: {string} tutorId.
 * Query parameter: {string} studentId.
 */
module.exports.deleteLectureRequest = (req, res) => {
  if((req.query && req.query.tutorId && req.query.studentId) && (req.params && req.params.lectureRequestId)) {
    var tutorId = req.query.tutorId;
    var studentId = req.query.studentId;

    LecturesRequest.findByIdAndDelete(req.params.lectureRequestId)
      .then(delRes => {
        User.updateMany(
          { $or: 
            [
              { _id: tutorId},
              { _id: studentId}
            ]
          },
          { $pull: { lecturesRequests: mongoose.Types.ObjectId(req.params.lectureRequestId) } }
        )
        .then(updateRes => {
          respondJson(res, 204, null);
        })
        .catch(err=> {
          respondJson(res, 500, 'User update failed:' + err.message);
          return;
        })
      })
      .catch(err => {
        respondJson(res, 500, err.message);
        return;
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'studentId or tutorId or lectureRequestId');
  }
};

