var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');

/* Users */
router.get('/users', 
  ctrlUsers.getUser);

module.exports = router;