'use strict';
var rp = require('request-promise');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * User login route.
 * Body: {String} username
 *       {String} password
 */
module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    respondJson(res, 400, errors.BadRequest + 'username or password.');
    return;
  }

  passport.authenticate('local', (error, user, data) => {
    if(error) {
      respondJson(res, 404, errors.NotFound);
      return;
    }
    if(user) {
      respondJson(res, 200, {
        token: user.generateJwt()
      });
    } else {
      respondJson(res, 401, data);
    }

  })(req, res); 
};

/**
 * User registration route.
 * Body: {User} User model.
 */
module.exports.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.reenterPassword || !req.body.firstName || 
      !req.body.lastName || !req.body.email || !req.body.educationLevel || !req.body.fieldOfEducation || !req.body.recaptchaResponse) {
        respondJson(res, 400, 'Please enter all of the required data and try again.');
        return;
  }

  if(req.body.password != req.body.reenterPassword) {
    respondJson(res, 400, 'Password mismatch. Please try again.');
    return;
  }

  if(!req.body.role) {
    respondJson(res, 500, 'User role is required. Please try again later.');
    return;
  }

  var validatedRecaptcha = await validateRecapcha(req.body.recaptchaResponse);
  if(!validatedRecaptcha.success) {
    respondJson(res, 500, 'You might be a robot. Please try again.');
    return;
  }

  var user = new User();

  user.username = req.body.username;
  user.hashPassword(req.body.password);
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.role = req.body.role;
  user.educationLevel = req.body.educationLevel;
  user.fieldOfEducation = req.body.fieldOfEducation;

  if (user.role == 'tutor' && req.body.teachingInstitution) {
    user.teachingInstitution = req.body.teachingInstitution;
  }

  user.save((error) => {
    if (error) {
      respondJson(res, 500, error);
    } else {
      respondJson(res, 200, {
        token: user.generateJwt()
      });
    }
   });
};

/* Validates recapcha using Google API. */
async function validateRecapcha(response) {
  var options = {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    json: true,
    qs: {
      secret: process.env.RECAPTCHA_SECRET,
      response: response
    }
  };
 
  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}

