'use strict';
var mongoose = require('mongoose');
var lectureEnums = require('./enums/lectures-enums');

var lecturesRequestSchema = new mongoose.Schema({
  lecture: {type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true},
  tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  status: {type: lectureEnums.lecturesRequestStatus, required: true},
  requestType: {type: lectureEnums.lecturesRequestsTypes, required: true},
  price: {type: Number},
  createdAt: {type: Date, "default": Date.now}
});

mongoose.model('LecturesRequest', lecturesRequestSchema, 'LecturesRequests');