var rp = require('request-promise');
var helperFunctions = require('../../lib/helper-functions');
var apiParams = helperFunctions.getApiParams();

/* GET index page + POST login req */
module.exports.index = async (req, res) => {
  var page = parseInt(req.query.page)  || 0;
  var lectureType = req.query.lectureType || 'posted';
  var search = req.query.search || '';
 

  var lectures = await getLectures(page, lectureType, search);
  var lecturesErrorMessage = '';
  if(lectures.error) {

  }

  if(true) {
    res.render('index', { 
      title: 'Tutke.io', 
      user: null, 
      lectures: lectures,
      page: page,
      lectureType: lectureType,
      search: search
    });
  
  // Error handling -> TODO: handle different errors
  } else {
    res.render('log-in', { title: 'LogIn', error: "Log in failed!" });
  } 

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

