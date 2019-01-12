'use strict';
var rp = require('request-promise');
var mongoose = require('mongoose');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;
var apiParams = helperFunctions.getApiParams();
var lectureEnums = require('../models/enums/lectures-enums');

/* Db models */
var User = mongoose.model('User');
var Lecture =  mongoose.model('Lecture');
var LecturesRequest =  mongoose.model('LecturesRequest');

/* Init db data */
var students = require('../models/static-data/students');
var comments = require('../models/static-data/comments');
var tutors = require('../models/static-data/tutors');
var lectures = require('../models/static-data/lectures');

/* Removes all of the collections from db. (Requirement for school project.) */
module.exports.dropDb = async (req, res) => {
  if (mongoose.connection.readyState == 1) {
    var usersDrop = await dropUsers();
    var lecturesDrop = await dropLectures();
    var lecturesRequestsDrop = await dropLecturesRequests();

    respondJson(res, 200, null);
  } else {
    respondJson(res, 500, 'Database is not connected. Please connect to database and try again!');
  }
};

/* Inits db to basic data. (Requirement for school project.) */
module.exports.initDb = async (req, res) => {
  var errorsCount = 0;
  var successCount = 0;

  for(var i = 0; i < tutors.length; i++) {
    var tutor = await createUser(tutors[i]);
    tutor.error ? errorsCount++ : successCount++;

    var student = await createUser(students[i]);
    student.error ? errorsCount++ : successCount++;

    for(var j = 0; j < lectures.length; j++) {
      if(lectures[j].lectureType == lectureEnums.lectureType.Posted) {
        var lecture = await createLecture(lectures[j], tutor.token);
        lecture.error ? errorsCount++ : successCount++;

        var lr = {
          lecture: lecture._id,
          tutor: tutor._id,
          student: student._id,
          status: lectureEnums.lecturesRequestStatus.Pending,
          requestType: lectureEnums.lecturesRequestsTypes.StudentRequest
        };

        var lectureRequest = await createLectureRequest(lr, tutor.token);
        lectureRequest.error ? errorsCount++ : successCount++;
      } else {
        lectures[j].author = student._id;
        var lecture = await createLecture(lectures[j], student.token);
        lecture.error ? errorsCount++ : successCount++;

        var lr = {
          lecture: lecture._id,
          tutor: tutor._id,
          student: student._id,
          status: lectureEnums.lecturesRequestStatus.Pending,
          requestType: lectureEnums.lecturesRequestsTypes.TutorOffer
        };

        var lectureRequest = await createLectureRequest(lr, student.token);
        lectureRequest.error ? errorsCount++ : successCount++;
      }
    }

    for(var j = 0; j < comments.length; j++) {
      comments[j].author = student._id;
      var comment = await addCommentToUser(comments[j], tutor._id, student.token);
      comment.error ? errorsCount++ : successCount++;
    }
  }

  var itemsCount = comments.length*students.length + students.length*2 + lectures.length*students.length*2;
  respondJson(res, 200, { message: `Successfully added ${successCount}/${itemsCount}. Number of errors: ${errorsCount}` });

};



/* Removes all of the data in Users collection except for admins. */
async function dropUsers() {
  return await User.remove({ role : { $ne: 'admin' } });
}

/* Removes all of the data in Lectures collection. */
async function dropLectures() {
  return await Lecture.remove({});
}

/* Removes all of the data in LecturesRequests collection. */
async function dropLecturesRequests() {
  return await LecturesRequest.remove({});
}

/* Creates user. */
async function createUser(body) {
  var user = new User();

  user.username = body.username;
  user.hashPassword(body.password);
  user.email = body.email;
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.role = body.role;
  user.educationLevel = body.educationLevel;
  user.fieldOfEducation = body.fieldOfEducation;

  if (user.role == 'tutor' && body.teachingInstitution) {
    user.teachingInstitution = body.teachingInstitution;
  }
  user.token = user.generateJwt();

  try {
    return await user.save();
  } catch (error) {
    return { error: error };
  }
}

/* Creates lecture: */
async function createLecture(body, accessToken) {
  var path = '/lectures';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body,
    auth: {
      'bearer': accessToken
    }
  };
 
  try {
    return await rp(options).promise();
  } catch (error) {
    return { error: error };
  }
}

/* Creates lecture request. */
async function createLectureRequest(body, accessToken) {
  var path = '/lecturesRequests';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body,
    auth: {
      'bearer': accessToken
    }
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return { error: error };
  }
}

/* Adds comment to user. */
async function addCommentToUser(body, userId, accessToken) {
  var path = '/users/' + userId + '/comments'
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body,
    auth: {
      'bearer': accessToken
    }
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return { error: error };
  }
}