'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Lecture =  mongoose.model('Lecture');

var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all lectures.
 * Query parameter: {boolean} populate
 * Query parameter: {String} lectureType
 */
module.exports.getLectures = (req, res) => {
  var queryOptions = {};
  if(req.query && req.query.lectureType) 
    queryOptions['lectureType'] = req.query.lectureType;

  if(req.query && req.query.search && req.query != '') 
    queryOptions['$text'] = { $search: req.query.search };

  var query = Lecture.find(queryOptions);
  if(req.query && req.query.populate) 
    query.populate('author', 'username');

  query.sort( {createdAt: -1} );

  if(req.query && req.query.page) {
    query.skip(req.query.page*10);
    query.limit(10);
  }

  query.exec((err, lectures) => {
    if(err) {
      respondJson(res, 500, err.message)
      return;
    } else {
      respondJson(res, 200, lectures);
    }
  });
};

/**
 * GET a user by lectureId.
 * Path parameter: {string} lectureId
 * Query parameter: {boolean} populate
 */
module.exports.getLecture = (req, res) => {
  if (req.params && req.params.lectureId) {
    var query = Lecture.findById(req.params.lectureId);

    if(req.query && req.query.populate) 
      query.populate('author');

    query.exec((err, lecture) => {
      if (!lecture) {
        respondJson(res, 404, errors.NotFound);
        return;
      } else if (err) {
        respondJson(res, 500, err.message);
        return;
      }
      respondJson(res, 200, lecture);
    });
  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureId');
  }
};

/**
 * UPDATES the whole lecture model.
 * Path parameter: {string} lectureId.
 * Body: {Lecture} Lecture model.
 */
module.exports.updateWholeLecture = (req, res) => {
  if(req.params && req.params.lectureId) {
    Lecture
      .findById(req.params.lectureId)
      .select('-createdAt -author -lectureType')
      .exec((err, lecture) => {
        if(!lecture) {
          respondJson(res, 404, errors.NotFound);
          return;
        } else if(err) {
          respondJson(res, 500, err.message);
          return;
        }
        
        lecture.title = req.body.title;
        lecture.description = req.body.description;
        lecture.price = req.body.price;
        
        lecture.save((err, lecture) => {
          if(err) {
            respondJson(res, 400, err.message);
          } else {
            respondJson(res, 200, lecture);
          }
        });
      });

  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureId');
  }
};

/**
 * UPDATES the lecture model - only attributes that are present in req body.
 * Path parameter: {string} lectureId.
 * Body: {Lecture} Lecture model.
 */
module.exports.updateLecture = function(req, res) {
  if(req.params && req.params.lectureId) {
    if(req.body.createdAt || req.body.author || req.body.lectureType) {
      respondJson(res, 400, 'Cannot update attributes: createdAt, author, lectureType.');
    } else {
      Lecture
        .update(
          { _id: mongoose.Types.ObjectId(req.params.lectureId)},
          { $set: req.body}
        ).then(updateRes => {
          respondJson(res, 200, updateRes);
        }).catch(err => {
          respondJson(res, 500, err.message);
        });
    }
  } else {
    respondJson(res, 400, errors.BadRequest + 'lectureId');
  }
}

/**
 * CREATES lecture and adds its reference to the user.
 * Body: {Lecture} Lecture model.
 */
module.exports.createLecture = (req, res) => {
  var userId = req.body.author;
  req.body.author = mongoose.Types.ObjectId(req.body.author);
  Lecture.create(req.body)
    .then(lecture => {
      User.updateOne(
        { _id: userId },
        { $push: { postedLectures: lecture.id } }
      )
      .then(updateRes => {
        respondJson(res, 201, lecture);
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
 * DELETES lecture and adds its reference from the user.
 * Query parameter: {string} Author's userId.
 */
module.exports.deleteLecture = (req, res) => {
  var userId = req.payload._id;
  var userRole = req.payload.role;

  if(userId) {
    if (req.params && req.params.lectureId) {
      Lecture.findById(req.params.lectureId)
        .then(lecture => {
          if(!lecture) {
            respondJson(res, 404, errors.NotFound);
            return;
          } else {
            if(userId == lecture.author.toString() || userRole == 'admin') {
              Lecture.findByIdAndDelete(req.params.lectureId)
                .then(delRes => {
                  User.updateOne(
                    { _id: userId},
                    { $pull: { postedLectures: mongoose.Types.ObjectId(req.params.lectureId) } }
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
          }
        })
        .catch(err => {
          respondJson(res, 500, err.message);
          return;
        });
    } else {
      respondJson(res, 400, errors.BadRequest + 'lectureId');
    }
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};


/**
 * GET lectures count and number of pages.
 * Query parameter: {String} lectureType
 */
module.exports.getCount = (req, res) => {
  var queryOptions = {};
  if(req.query && req.query.lectureType) 
    queryOptions['lectureType'] = req.query.lectureType;

  if(req.query && req.query.search && req.query != '') 
    queryOptions['$text'] = { $search: req.query.search };
  
  Lecture
    .find(queryOptions)
    .count()
    .exec((err, response) => {
      if (err) {
        respondJson(res, 500, err.message);
        return;
      }

      var data = {
        pages: Math.ceil(response/10),
        count: response
      }
      respondJson(res, 200, data);
    });
}