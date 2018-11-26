var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();

/* GET LogIn page */
module.exports.renderLogIn = function(req, res) {
  res.render('log-in', { title: 'LogIn' });
};

/**
 * USER log in route.
 */
module.exports.logIn = async (req, res) => {
  var logInError;
  if(req.body && req.body.password && req.body.username) {
    var user = await performLogIn(req.body);
    if(user.error) {
      logInError = 'Log in failed:' + user.error.message ? user.error.message : user.error;
    }
    global.loggedInUser = user._id ? user._id : null;

  } else {
    logInError = "Please enter username and password!";
  }

  if(logInError) {
    res.render('log-in', { 
      title: 'LogIn',
      error: logInError
    });
  } else {
    res.render('log-in', { 
      title: 'LogIn',
      userId: user._id,
      successful: true
    });
  }
};

async function performLogIn(body) {
  var path = '/users/auth';
  var options = {
    url: apiParams + path,
    method: 'POST',
    json: true,
    body: {
      username: body.username,
      password: body.password
    }
  };
 
  try {
    return await rp(options).promise();
  } catch (error) {
    return error;
  }
}