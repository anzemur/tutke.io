var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlLectures = require('../controllers/lectures');
var ctrlLecturesRequests = require('../controllers/lectures-requests');

/**
 * USERS routes.
 */
router.get('/users', 
  ctrlUsers.getUsers);

router.get('/users/:userId', 
  ctrlUsers.getUser);

router.patch('/users/:userId', 
  ctrlUsers.updateUser);

router.put('/users/:userId', 
  ctrlUsers.updateWholeUser);

router.post('/users', 
  ctrlUsers.createUser);

router.delete('/users/:userId', 
  ctrlUsers.deleteUser);

router.post('/users/auth', 
  ctrlUsers.authUser);

/**
 * LECTURES routes.
 */
router.get('/lectures', 
  ctrlLectures.getLectures);

router.get('/lectures/:lectureId', 
  ctrlLectures.getLecture);
  
router.patch('/lectures/:lectureId', 
  ctrlLectures.updateLecture);

router.put('/lectures/:lectureId', 
  ctrlLectures.updateWholeLecture);

router.post('/lectures', 
  ctrlLectures.createLecture);

router.delete('/lectures/:lectureId', 
  ctrlLectures.deleteLecture);

/**
 * LECTURE REQUESTS routes.
 */
router.get('/lecturesRequests', 
  ctrlLecturesRequests.getLecturesRequests);

router.get('/lecturesRequests/:lectureRequestId', 
  ctrlLecturesRequests.getLectureRequest);

// router.put('/lecturesRequests/:lectureRequestId', 
//   ctrlLecturesRequests.updateWholeLectureRequest);

router.post('/lecturesRequests', 
  ctrlLecturesRequests.createLectureRequest);

router.delete('/lecturesRequests/:lectureRequestId', 
  ctrlLecturesRequests.deleteLectureRequest);

module.exports = router;