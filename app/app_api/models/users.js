'use strict';
var mongoose = require('mongoose');
var userEnums = require('./enums/users-enums');

var commentSchema = new mongoose.Schema({
  author: {type: String, required: true},
  rating: {type: Number, required: true, min: 0, max: 5},
  commentText: {type: String, required: true},
  createdAt: {type: Date, "default": Date.now}
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, dropDups: true, required: true},
  teachingInstitution: String,
  educationLevel: String,
  fieldOfEducation: String,
  rating: {type: Number, "default": 0, min: 0, max: 5}, 
  role: {type: userEnums.userRoles, required: true},
  comments: [commentSchema]
});

mongoose.model('User', userSchema, 'Users');