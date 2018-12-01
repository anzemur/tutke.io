var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();


/* GET user profile page */
module.exports.userProfile = function(req, res) {
  res.render('user-preview', { title: 'User' });
};
