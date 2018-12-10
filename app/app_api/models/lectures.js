'use strict';
var mongoose = require('mongoose');
var lectureEnums = require('./enums/lectures-enums');

var lectureSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true, minlength: 200 },
  lectureType: {type: lectureEnums.lectureType, required: true},
  price: {type: Number},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, "default": Date.now}
});
lectureSchema.index({name: 'text', 'title': 'text'});
mongoose.model('Lecture', lectureSchema, 'Lectures');