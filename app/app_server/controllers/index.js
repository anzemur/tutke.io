var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();

/** Global variable for simulating logged in user */
global.loggedInUser = null;

/* GET index page + POST login req */
module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page)  || 0;
  var lectureType = req.query.lectureType || 'posted';
  var search = req.query.search || '';

  /* Simulate logged in user instead of using local storage with JWT  */
  var user;
  if(loggedInUser) {
    user = await getUser(loggedInUser);
  }
 
  var lectures = await getLectures(page, lectureType, search);
  var lecturesErrorMessage;
  if(lectures.error) {

  }

  res.render('index', { 
    title: 'Tutke.io', 
    user: user, 
    lectures: lectures,
    page: page,
    lectureType: lectureType,
    search: search,
    lecturesError: lecturesErrorMessage
  });
};


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
