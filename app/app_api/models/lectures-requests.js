'use strict';
var mongoose = require('mongoose');
var lectureEnums = require('./enums/lectures-enums');

var lecturesRequestSchema = new mongoose.Schema({
  lecture: {type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true},
  tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  status: {type: lectureEnums.lecturesRequestStatus, required: true, 'default': 'pending'},
  requestType: {type: lectureEnums.lecturesRequestsTypes, required: true},
  createdAt: {type: Date, "default": Date.now}
});

lecturesRequestSchema.index({ lecture: 1, tutor: 1, student: 1}, {name: 'unique_lectures_requests_index', unique: true });
mongoose.model('LecturesRequest', lecturesRequestSchema, 'LecturesRequests');