/* GET index page + POST login req */
module.exports.index = function(req, res) {
  //We came from login page, so req has body with logIn params.
  var studentModel = require('../models/static-data/userStudent.json');
  var tutorModel = require('../models/static-data/userTutor.json')

  var logedInUser =  tutorModel;

  if(req.body) {
    /* Simulate logIn */
    logedInUser = req.body.username == 'student' ?  studentModel : tutorModel;
  }

  console.log(logedInUser);
  
  // TODO
  // Log in successful
  if(true) {
    res.render('index', { title: 'Tutke.io', user: logedInUser });
  
  // Error handling -> TODO: handle different errors
  } else {
    res.render('log-in', { title: 'LogIn', error: "Log in failed!" });
  } 

};