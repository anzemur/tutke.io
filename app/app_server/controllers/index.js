var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();
var lectureEnums = require('../../app_api/models/enums/lectures-enums');

/** Global variable for simulating logged in user */
global.loggedInUser = null;

/* GET index page */
module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page)  || 0;
  var lectureType = req.query.lectureType || 'posted';
  var search = req.query.search || '';

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  /** Lectures requests create handling */
  var lectureRequestMsg;
  var lectureRequestError;
  if(req.query.lecture && user && user._id) {
    var lectureId = req.query.lectureId;
    var lecture = await getLecture(lectureId);

    if(req.query.lecture == 'offer') {
      if(lecture._id && lecture.author && user._id) {
        var body = {
          lecture: lecture._id,
          tutor: user._id,
          student: lecture.author,
          requestType: lectureEnums.lecturesRequestsTypes.TutorOffer
        }
        var lecturesRequests = await createLectureRequest(body);
        if(lecturesRequests.error) {
          lectureRequestError =  lecturesRequests.error.message ? lecturesRequests.error.message : lecturesRequests.error;
        } else {
          lectureRequestMsg = 'Offer sent to student.' 
        }
      } else {
        lectureRequestError = "Offer to student failed."
      }
    } else {
      if(lecture._id && lecture.author && user._id) {
        var body = {
          lecture: lecture._id,
          tutor: lecture.author,
          student: user._id,
          requestType: lectureEnums.lecturesRequestsTypes.StudentRequest
        }
        var lecturesRequests = await createLectureRequest(body);
        if(lecturesRequests.error) {
          lectureRequestError =  lecturesRequests.error.message ? lecturesRequests.error.message : lecturesRequests.error;
        } else {
          lectureRequestMsg = 'Request sent to tutor.' 
        }
      } else {
        lectureRequestError = "Request to tutor failed."
      }
    }
  }

  /** Fetch lectures on index page */
  var lectures = await getLectures(page, lectureType, search);
  var lecturesErrorMessage;
  if(lectures.error) {
    // TODO
  }

  /* Render index page */
  res.render('index', { 
    title: 'Tutke.io', 
    user: user, 
    lectures: lectures,
    page: page,
    lectureType: lectureType,
    search: search,
    lecturesError: lecturesErrorMessage,
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
    lectureRequestMsg: lectureRequestMsg,
    lectureRequestError: lectureRequestError
  });
};


/** API CALLS */
async function getLectures(page, lectureType, search) {
  var path = '/lectures';
  var options = {
    url: apiParams + path,
    method: 'GET',
    json: {},
    qs: {
      populate: true,
      page: page,
      lectureType: lectureType,
      search: search
    }
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}


async function getUser(userId) {
  var path = '/users/' + userId;
  var options = {
    url: apiParams + path,
    method: 'GET',
    json: {},
    qs: {
      populate: true
    }
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}


async function getLecture(lectureId) {
  var path = '/lectures/' + lectureId;
  var options = {
    url: apiParams + path,
    method: 'GET',
    json: {},
    qs: {}
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
 