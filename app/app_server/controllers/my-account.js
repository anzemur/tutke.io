var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();

/* GET my account page */
module.exports.myAccount = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  /** Sent lectures requests delete handling */
  if(req.query && req.query.sentLectureId && user && user._id) {
    var lectureRequest = await deleteLectureRequest(req.query.sentLectureId);
    user = await getUser(loggedInUser);
    if(lectureRequest && lectureRequest.error) {
      errorMsg = lectureRequest.error.message ? lectureRequest.error.message : lectureRequest.error;
    } else {
      successMsg = "Sent request successfully deleted."
    }
  }

   /** Active lectures delete handling */
  if(req.query && req.query.lectureId && user && user._id) {
    var lecture = await deleteLecture(req.query.lectureId, user._id);
    user = await getUser(loggedInUser);
    if(lecture && lecture.error) {
      errorMsg = lecture.error.message ? lecture.error.message : lecture.error;
    } else {
      successMsg = "Lecture successfully deleted."
    }
  }

  if(!user) {
    res.render('log-in', { 
      title: 'Log In',
      logInError: 'Please log in to see additonal information.'
    });
  } else {
    res.render('my-account-page', { 
      title: 'My account',
      user: user,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  }
};


async function deleteLectureRequest(lectureReqId) {
  var path = '/lecturesRequests/' + lectureReqId;
  var options = {
    url: apiParams + path,
    method: 'DELETE',
    json: {},
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}

async function deleteLecture(lectureId, userId) {
  var path = '/lectures/' + lectureId;
  var options = {
    url: apiParams + path,
    method: 'DELETE',
    json: {},
    qs: {
      userId: userId
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
