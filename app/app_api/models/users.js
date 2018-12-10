'use strict';
var mongoose = require('mongoose');
var userEnums = require('./enums/users-enums');

var commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: {type: Number, required: true, min: 1, max: 5},
  commentText: {type: String, required: true},
  createdAt: {type: Date, "default": Date.now}
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true, validate: /^\w{6,}$/ },
  password: {type: String, required: true, validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ },
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

mongoose.model('User', userSchema, 'Users');