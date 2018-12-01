'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * GET all users.
 */
module.exports.getUsers = (req, res) => {
  User
    .find()
    .exec((err, users) => {
      if(err) {
        respondJson(res, 500, err.message);
        return;
      } else {
        respondJson(res, 200, users);
      }
    });
};

/**
 * GET a user by userId.
 * Path parameter: {string} userId.
 * Query parameter: {boolean} populate.
 */
module.exports.getUser = (req, res) => {
  if (req.params && req.params.userId) {
    var query = User.findById(req.params.userId);

    if(req.query && req.query.populate) {
      query.populate('postedLectures');
      query.populate({path: 'lecturesRequests', populate: {path: 'student'}});
      query.populate({path: 'lecturesRequests', populate: {path: 'tutor'}});
      query.populate({path: 'lecturesRequests', populate: {path: 'lecture'}});
    }

    res.render('userPreview');
      
    query.exec((err, user) => {
      if (!user) {
        respondJson(res, 404, errors.NotFound);
        return;
      } else if (err) {
        respondJson(res, 500, err.message);
        return;
      }
      respondJson(res, 200, user);
    });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};

/**
 * UPDATES the whole user model.
 * Path parameter: {string} userId.
 * Body: {User} User model.
 */
module.exports.updateWholeUser = (req, res) => {
  if(req.params && req.params.userId) {
    User
      .findById(req.params.userId)
      .select('-comments -rating -role -postedLectures -password -lecturesRequests')
      .exec((err, user) => {
        if(!user) {
          respondJson(res, 404, errors.NotFound);
          return;
        } else if(err) {
          respondJson(res, 500, err.message);
          return;
        }
        
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.teachingInstitution = req.body.teachingInstitution;
        user.educationLevel = req.body.educationLevel;
        user.fieldOfEducation = req.body.fieldOfEducation;
        user.username = req.body.username;
        
        user.save((err, user) => {
          if(err) {
            respondJson(res, 400, err.message);
          } else {
            respondJson(res, 200, user);
          }
        });
      });

  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
};

/**
 * UPDATES the user model - only attributes that are present in req body.
 * Path parameter: {string} userId.
 * Body: {User} User model.
 */
module.exports.updateUser = function(req, res) {
  if(req.params && req.params.userId) {
    if(req.body.password || req.body.rating || req.body.role || req.body.postedLectures || req.body.lecturesRequests) {
      respondJson(res, 400, 'Cannot update attributes: password, rating, role, postedLectures, lecturesRequests.');
    } else {
      User
        .update(
          { _id: mongoose.Types.ObjectId(req.params.userId)},
          { $set: req.body}
        ).then(updateRes => {
          respondJson(res, 200, null);
        }).catch(err => {
          respondJson(res, 500, err.message);
        });
    }
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
}

/**
 * CREATES user.
 * Body: {User} User model.
 */
module.exports.createUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if(err) {
      respondJson(res, 400, err.message);
      return;
    } else {
      respondJson(res, 201, user);
    }
  }); 
};

/**
 * DELETES a user by userId.
 */
module.exports.deleteUser = function(req, res) {
  if(req.params.userId && req.params.userId) {
    User
      .findByIdAndRemove(req.params.userId)
      .exec((err, users) => {
        if(err) {
          respondJson(res, 500, err.message);
          return;
        } else {
          respondJson(res, 204, null);
        }
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'userId');
  }
}


/**
 * USER AUTHENTICATION by username and password (Simulates user authentication*)
 * Body: {string} username
 *       {string} password
 */
module.exports.authUser = function(req, res) {
  if(req.body.username && req.body.password) {
    User
      .findOne({username: req.body.username})
      .exec((err, user) => {
        if (!user) {
          respondJson(res, 404, errors.NotFound);
          return;
        } else if (err) {
          respondJson(res, 500, err.message);
          return;
        }
        respondJson(res, 200, user);
      });
  } else {
    respondJson(res, 400, errors.BadRequest + 'username or password.');
  }
}