var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();


/* GET user profile page */
module.exports.userProfile = async (req, res) => {

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  /** comment delete handling */
  if(req.query && req.query.commentId && user && user._id) {
    var commentToDelete = await deleteComment(req.query.commentId, req.params.userId);
    user = await getUser(loggedInUser);
    if(commentToDelete && commentToDelete.error) {
      errorMsg = commentToDelete.error.message ? commentToDelete.error.message : commentToDelete.error;
    } else {
      successMsg = "Comment successfully deleted."
    }
  }

  var currentUserError;
  var currentUser;
  if(req.params.userId) {
    currentUser = await getUser(req.params.userId);
    if(currentUser.error) {
      currentUserError = currentUser.error.message ? currentUser.error.message : currentUser.error;
      currentUser = null;
    }
  } else {
    currentUserError = 'Couldn\'t load user info.';
  }

  res.render('user-preview', { 
    title: currentUser ? currentUser.username : 'User',
    currentUser: currentUser,
    user: user,
    currentUserError: currentUserError
  });
};


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

async function deleteComment(commentReqId, userReqId) {
  var path = '/users/' + userReqId + '/comments/' + commentReqId;
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
