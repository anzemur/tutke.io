var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();

/* GET my account page */
module.exports.myAccount = async (req, res) => {

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }


  res.render('my-account-page', { 
    title: 'My account',
    user: user
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
