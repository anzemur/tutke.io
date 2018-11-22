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


/**
 * LECTURES routes.
 */
router.get('/lectures', 
  ctrlLectures.getLectures);


module.exports = router;