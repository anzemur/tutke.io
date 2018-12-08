var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();
var mongoose = require('mongoose');
var lectureEnums = require('../../app_api/models/enums/lectures-enums');

/* Db models */
var User = mongoose.model('User');
var Lecture =  mongoose.model('Lecture');
var LecturesRequest =  mongoose.model('LecturesRequest');

/* Init db data */
var students = require('../models/static-data/students');
var comments = require('../models/static-data/comments');
var tutors = require('../models/static-data/tutors');
var lectures = require('../models/static-data/lectures');

/**
 * GET admin db page.
 * Query param {boolean} drop -> tells if db should be dropped
 * Query param {boolean} init -> tells if db should be initialize to base data.
 */
module.exports.dbPage = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Drop data base */
  if(req.query && req.query.drop) {
    if (mongoose.connection.readyState == 1) {
      var usersDrop = await dropUsers();
      var lecturesDrop = await dropLectures();
      var lecturesRequestsDrop = await dropLecturesRequests();

      successMsg = "Database dropped successfully!";
    } else {
      errorMsg = "Database is not connected. Please connect to database and try again!"
    }
  }

  var errorsCount = 0;
  var successCount = 0;

  /* Init database */
  if(req.query && req.query.init) {
    for(var i = 0; i < tutors.length; i++) {
      var tutor = await createUser(tutors[i]);
      tutor.error ? errorsCount++ : successCount++;

      var student = await createUser(students[i]);
      student.error ? errorsCount++ : successCount++;

      for(var j = 0; j < lectures.length; j++) {
        if(lectures[j].lectureType == lectureEnums.lectureType.Posted) {
          lectures[j].author = tutor._id;
          var lecture = await createLecture(lectures[j]);
          lecture.error ? errorsCount++ : successCount++;

          var lr = {
            lecture: lecture._id,
            tutor: tutor._id,
            student: student._id,
            status: lectureEnums.lecturesRequestStatus.Pending,
            requestType: lectureEnums.lecturesRequestsTypes.StudentRequest
          };

          var lectureRequest = await createLectureRequest(lr);
          lectureRequest.error ? errorsCount++ : successCount++;
        } else {
          lectures[j].author = student._id;
          var lecture = await createLecture(lectures[j]);
          lecture.error ? errorsCount++ : successCount++;

          var lr = {
            lecture: lecture._id,
            tutor: tutor._id,
            student: student._id,
            status: lectureEnums.lecturesRequestStatus.Pending,
            requestType: lectureEnums.lecturesRequestsTypes.TutorOffer
          };

          var lectureRequest = await createLectureRequest(lr);
          lectureRequest.error ? errorsCount++ : successCount++;
        }
      }

      for(var j = 0; j < comments.length; j++) {
        comments[j].author = student._id;
        var comment = await addCommentToUser(comments[j], tutor._id);
        comment.error ? errorsCount++ : successCount++;
      }
    }
    var itemsCount = comments.length + students.length*2 + lectures.length*2;
    successMsg = `Successfully added ${successCount}/${itemsCount}. Number of errors: ${errorsCount}`;
  }

  res.render('db', { 
    successMsg: successMsg,
    errorMsg: errorMsg
  });
};


async function dropUsers() {
  return await User.remove({});
}

async function dropLectures() {
  return await Lecture.remove({});
}

async function dropLecturesRequests() {
  return await LecturesRequest.remove({});
}


async function createUser(body) {
  var path = '/users';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: {
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      teachingInstitution: body.teachingInstitution,
      educationLevel: body.educationLevel,
      fieldOfEducation: body.fieldOfEducation,
      role: body.role
    }
  };
 
  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}

async function createLecture(body) {
  var path = '/lectures';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body
  };
 
  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}

async function createLectureRequest(body) {
  var path = '/lecturesRequests';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}

async function addCommentToUser(body, userId) {
  var path = '/users/' + userId + '/comments'
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: body
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}