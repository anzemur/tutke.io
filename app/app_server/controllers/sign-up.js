var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();


/* GET SignUp page */
module.exports.signUpRender = function(req, res) {
  res.render('sign-up', { title: 'SignUp' });
};

/**
 * USER sign up route.
 */
module.exports.signUp = async (req, res) => {
  var signUpError;
  if(req.body) {
    if(req.body.password == req.body.password1) {
      var user = await performSignUp(req.body);
      if(user.error) {
        signUpError = 'Sign up failed:' + user.error.message ? user.error.message : user.error;
      }
    } else {
      signUpError = "Password mismatch. Please try again."
    }    
  } else {
    signUpError = "Not enough data. Please try again."
  }

  if(signUpError) {
    res.render('sign-up', { 
      title: 'SignUp',
      error: signUpError
    });
  } else {
    res.render('log-in', { 
      title: 'LogIn',
      msg: 'Registration successful! Please log in.' 
    });
  }
};


async function performSignUp(body) {
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
