var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');
var ctrlLogIn = require('../controllers/logIn');

/* GET index page. */
router.get('/', ctrlIndex.index);
router.get('/login', ctrlLogIn.logIn);

module.exports = router;
