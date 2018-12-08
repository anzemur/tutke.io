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

  var deletedUser = false;
  /** User delete handling */
  if(req.query && req.query.delete && user && user._id) {
    var userToDelete = await deleteUser(user._id);
    if(userToDelete && userToDelete.error) {
      errorMsg = userToDelete.error.message ? userToDelete.error.message : userToDelete.error;
    } else {
      successMsg = "User successfully deleted.";
      deletedUser = true;
      user = null;
    }
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
      successMsg = "Lecture successfully deleted.";
    }
  }

  if(!user) {
    errorMsg = deletedUser ? null : 'Please log in to see additonal information.';
    res.render('log-in', { 
      title: 'Log In',
      error: errorMsg,
      successful: successMsg
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


/* GET edit account page */
module.exports.editAccountPage = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }


  if(!user) {
    res.render('log-in', { 
      title: 'Log In',
      error: 'Please log in to see additonal information.'
    });
  } else {
    res.render('edit-profile', { 
      title: 'Edit account',
      user: user,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  }
};

/* POST edit account request */
module.exports.editAccountReq = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  /* Update user model */
  if(req.body) {
    if(req.body.password == req.body.password1 && user) {
      var userUpdate = await updateUser(req.body, user.role, user._id);
      if(userUpdate.error) {
        errorMsg = 'User update failed:' + userUpdate.error;
      } else {
        user = await getUser(loggedInUser);
      }
    } else {
      errorMsg = "Password mismatch. Please try again.";
    }    
  } else {
    errorMsg = 'Not enough data. Please try again.';
  }

  if(errorMsg) {
    res.render('edit-profile', { 
      title: 'Edit account',
      user: user,
      errorMsg: errorMsg
    });
  } else {
    res.render('my-account-page', { 
      title: 'My account',
      user: user,
      errorMsg: errorMsg,
      successMsg: 'User updated successfully.'
    });
  }
};

/* GET edit lecture page */
module.exports.editLecturePage = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  var lecture;
  if(req.params.lectureId) {
    lecture = await getLecture(req.params.lectureId);
    if(lecture.error) {
      errorMsg = 'Couldn\'t find lecture with given id: ' + userUpdate.error;
    }
  }

  if(!user) {
    res.render('log-in', { 
      title: 'Log In',
      error: 'Please log in to see additonal information.'
    });
  } else if(!lecture) {
    res.render('my-account-page', { 
      title: 'My account',
      user: user,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  } else if(errorMsg) {
    res.render('my-account-page', { 
      title: 'My account',
      user: user,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  } else {
    res.render('edit-lecture', { 
      title: 'Edit lecture',
      user: user,
      lecture: lecture,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  }
};

/* POST edit lecture */
module.exports.editLectureReq = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  if(user && user._id && req.body.title && req.body.description) {
    if(user.role == 'tutor') {
      if(req.body.price) {
        var lecture = await editLecture(req.body, req.params.lectureId);
        if(lecture.error) {
          errorMsg = lecture.error.message ? lecture.error.message : lecture.error;
        } else {
          successMsg = 'Lecture successfully edited.';
          user = await getUser(loggedInUser);
        }
      } else {
        errorMsg = 'Please enter price.';
      }
    } else {
      var lecture = await editLecture(req.body, req.params.lectureId);
      if(lecture.error) {
        errorMsg = lecture.error.message ? lecture.error.message : lecture.error;
      } else {
        successMsg = 'Lecture successfully edited.';
        user = await getUser(loggedInUser);
      }
    }
  } else {
    errorMsg = 'Please enter all of the required data!';
  }

  res.render('my-account-page', { 
    title: 'My account',
    user: user,
    errorMsg: errorMsg,
    successMsg: successMsg
  });
 
 };


async function deleteUser(userId) {
  var path = '/users/' + userId
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

async function updateUser(body, role, id) {
  var path = '/users/' + id;
  var options = {
    url: apiParams + path,
    method: 'PUT',
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
      role: role
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

async function editLecture(body, lectureId){
  var path = '/lectures/' + lectureId
  var options = {
    url: apiParams + path,
    method: 'PUT',
    json: true,
    body: body
  };

  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}