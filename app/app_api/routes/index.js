var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_PASSWORD,
  userProperty: 'payload'
});

var ctrlAuthentication = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users');
var ctrlComments = require('../controllers/comments');
var ctrlLectures = require('../controllers/lectures');
var ctrlLecturesRequests = require('../controllers/lectures-requests');

/**
 * USERS routes.
 */
router.get('/users',
  ctrlUsers.getUsers);

router.get('/users/:userId',
  ctrlUsers.getUser);

router.patch('/users/:userId', auth,
  ctrlUsers.updateUser);

router.put('/users/:userId', auth,
  ctrlUsers.updateWholeUser);

router.post('/users', auth,
  ctrlUsers.createUser);

router.delete('/users/:userId', auth,
  ctrlUsers.deleteUser);

router.post('/users/auth', auth,
  ctrlUsers.authUser);

/**
 * USER AUTHENTICATION routes.
 */
router.post('/register',
  ctrlAuthentication.register);

router.post('/login',
  ctrlAuthentication.login);
 

/**
 * COMMENTS routes.
 */
router.post('/users/:userId/comments', auth,
  ctrlComments.createComment);
  
router.get('/users/:userId/comments/:commentId', auth,
  ctrlComments.getComment);

router.put('/users/:userId/comments/:commentId', auth,
  ctrlComments.updateComment);

router.delete('/users/:userId/comments/:commentId', auth,
  ctrlComments.deleteComment)

/**
 * LECTURES routes.
 */
router.get('/lectures', 
  ctrlLectures.getLectures);

router.get('/lectures/:lectureId', 
  ctrlLectures.getLecture);
  
router.patch('/lectures/:lectureId', auth,
  ctrlLectures.updateLecture);

router.put('/lectures/:lectureId', auth,
  ctrlLectures.updateWholeLecture);

router.post('/lectures', auth,
  ctrlLectures.createLecture);

router.delete('/lectures/:lectureId', auth,
  ctrlLectures.deleteLecture);

router.get('/lectures-count', 
  ctrlLectures.getCount);

/**
 * LECTURE REQUESTS routes.
 */
router.get('/lecturesRequests', auth,
  ctrlLecturesRequests.getLecturesRequests);

router.get('/lecturesRequests/:lectureRequestId', auth,
  ctrlLecturesRequests.getLectureRequest);

router.put('/lecturesRequests/:lectureRequestId', auth,
  ctrlLecturesRequests.updateWholeLectureRequest);

router.post('/lecturesRequests', auth,
  ctrlLecturesRequests.createLectureRequest);

router.delete('/lecturesRequests/:lectureRequestId', auth,
  ctrlLecturesRequests.deleteLectureRequest);

module.exports = router;