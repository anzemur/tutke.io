'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var userEnums = require('./enums/users-enums');

var commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: {type: Number, required: true, min: 1, max: 5},
  commentText: {type: String, required: true},
  createdAt: {type: Date, "default": Date.now}
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true, validate: /^\w{6,}$/ },
  password: {type: String, required: true},
  randomHashingValue: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, dropDups: true, required: true},
  teachingInstitution: String,
  educationLevel: {type: String, required: true},
  fieldOfEducation: {type: String, required: true},
  rating: {type: Number, "default": 0, min: 0, max: 5}, 
  role: {type: userEnums.userRoles, required: true},
  comments: [commentSchema],
  postedLectures: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'} ],
  lecturesRequests:  [ {type: mongoose.Schema.Types.ObjectId, ref: 'LecturesRequest'} ],
  createdAt: {type: Date, "default": Date.now}
});

/**
 * Hashes user's password using random value salt.
 * @param {String} password user's password 
 */
userSchema.methods.hashPassword = function(password) {
  this.randomHashingValue = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.randomHashingValue, 1000, 64, 'sha512').toString('hex');
};

/**
 * Checks if given password matches user's password
 * @param {String} password user's password 
 */
userSchema.methods.checkPassword = function(password) {
  var hashedPassword = crypto.pbkdf2Sync(password, this.randomHashingValue, 1000, 64, 'sha512').toString('hex');
  return this.password == hashedPassword;
};

/**
 * Generates JWT for current user.
 */
userSchema.methods.generateJwt = function() {
  var exDate = new Date();
  exDate.setDate(exDate.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    role: this.role,
    exDate: parseInt(exDate.getTime() / 1000, 10)
  }, process.env.JWT_PASSWORD);
};

mongoose.model('User', userSchema, 'Users');