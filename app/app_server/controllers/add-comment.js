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

/* GET edit review page */
module.exports.editCommentPage = async (req, res) => {
  var successMsg;
  var errorMsg;

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }

  var comment;
  if(req.params.commentId) {
    comment = await getComment(req.params.userId ,req.params.commentId);
  } else {
    errorMsg = 'commentId is missing or undefined';
  }

  if(!user) {
    res.render('log-in', { 
      title: 'Log In',
      error: 'Please log in to see additonal information.'
    });
  } else {
    res.render('edit-review', { 
      title: 'Edit review',
      user: user,
      currentUser: req.params.userId,
      commentContent: comment,
      errorMsg: errorMsg,
      successMsg: successMsg
    });
  }
};

/* POST edit review  */
module.exports.editCommentReq = async (req, res) => {
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
    var comment = await editComment(req.body, req.params.userId, req.params.commentId);
    if(comment.error) {
      errorMsg = comment.error.message ? comment.error.message : comment.error;
    } else {
      successMsg = 'Comment successfully edited.'
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

async function getComment(userId, commentId) {
  var path = '/users/' + userId + '/comments/' + commentId;
  var options = {
    url: apiParams + path,
    method: 'GET',
    json: {},
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

async function editComment(body, userId, commentId) {
  var path = '/users/' + userId + '/comments/' + commentId
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