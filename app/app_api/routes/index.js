var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlLectures = require('../controllers/lectures');

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

/**
 * LECTURES routes.
 */
router.get('/lectures', 
  ctrlLectures.getLectures);

router.get('/lectures/:lectureId', 
  ctrlLectures.getLecture);

router.post('/lectures', 
  ctrlLectures.createLecture);

router.delete('/lectures/:lectureId', 
  ctrlLectures.deleteLecture);

module.exports = router;