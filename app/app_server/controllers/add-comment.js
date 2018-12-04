var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();


module.exports.renderCommentForm = async(req, res) => {
   /* Simulate logged in user instead of using local storage with JWT  */
   var user;
   if(loggedInUser) {
     user = await getUser(loggedInUser);
   }

  res.render('add-review', { 
    title: 'Add comment',
    user: user,
    currentUser: req.params.userId
  });
}


module.exports.addComment = async(req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  /** Add comment to the db. */
  if(user && user._id && req.body.rating && req.body.commentText && req.params.userId) {
    req.body.author = user._id;
    var newComment = await addCommentToUser(req.body, req.params.userId);
    if(newComment.error) {
      errorMsg = newComment.error.message ? newComment.error.message : newComment.error;
    } else {
      successMsg = 'Comment successfully added.'
    }

  } else {
    errorMsg = 'Please enter all of the required data!';
  }

  var currentUser;
  if(req.params.userId) {
    currentUser = await getUser(req.params.userId);
    if(currentUser.error) {
      errorMsg = currentUser.error.message ? currentUser.error.message : currentUser.error;
      currentUser = null;
    }
  } else {
    errorMsg = 'Couldn\'t load user info.';
  }

 res.render('user-preview', { 
   title: currentUser ? currentUser.username : 'User',
   user: user,
   currentUser: currentUser,
   errorMsg: errorMsg,
   successMsg: successMsg

 });
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