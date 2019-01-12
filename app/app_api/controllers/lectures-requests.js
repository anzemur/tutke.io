'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
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

    if (!(/^\w+$/.test(req.params.lectureRequestId)) || Object.keys(req.query).length > 0) {
      respondJson(res, 400, errors.BadRequest);
      return;
    }

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
      } else if(!lecturesRequest) {
        respondJson(res, 404, errors.NotFound);
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
 * UPDATES the whole lecture request model (User can only update the status attr.)
 * Path parameter: {string} lectureRequestId.
 * Body: {LecturesRequest} LecturesRequest model (Only attribute status can be in body).
 */
module.exports.updateWholeLectureRequest = (req, res) => {
  if(req.params && req.params.lectureRequestId) {
    if (!(/^\w+$/.test(req.params.lectureRequestId)) || Object.keys(req.query).length > 0) {
      respondJson(res, 400, errors.BadRequest);
      return;
    }
    LecturesRequest
      .findById(req.params.lectureRequestId)
      .select('-createdAt -price -requestType -student -tutor -lecture')
      .exec((err, lecturesRequest) => {
        if(!lecturesRequest) {
          respondJson(res, 404, errors.NotFound);
          return;
        } else if(err) {
          respondJson(res, 500, err.message);
          return;
        }
        
        lecturesRequest.status = req.body.status;
        
        lecturesRequest.save((err, lecturesRequest) => {
          if(err) {
            respondJson(res, 400, err.message);
          } else {
            respondJson(res, 200, lecturesRequest);
          }
        });
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
 * DELETES lectures request and its reference from tutor and student.
 * Path parameter: {string} lectureRequestId.
 */
module.exports.deleteLectureRequest = (req, res) => {
  var userId = userId = req.payload._id;

  if(req.params && req.params.lectureRequestId) {
    if (!(/^\w+$/.test(req.params.lectureRequestId)) || Object.keys(req.query).length > 0) {
      respondJson(res, 400, errors.BadRequest);
      return;
    }
    LecturesRequest.findById(req.params.lectureRequestId)
      .then(lecturesRequest => {

        var tutorId = lecturesRequest.tutor;
        var studentId = lecturesRequest.student;

        if(userId == tutorId.toString() || userId == studentId.toString()) {
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
            respondJson(res, 403, errors.Forbidden);
            return;
          }
        })
      .catch(err => {
        respondJson(res, 404, errors.NotFound);
        return;
      });

  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureRequestId');
  }
};

