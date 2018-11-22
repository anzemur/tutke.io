var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');

/**
 * USERS routes.
 */
router.get('/users', 
  ctrlUsers.getUsers);

router.get('/users/:userId', 
  ctrlUsers.getUser);



module.exports = router;