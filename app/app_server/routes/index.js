var express = require('express');
var router = express.Router();

var ctrlIndex = require('../controllers/index');
var ctrlLogIn = require('../controllers/log-in');
var ctrlSignUp = require('../controllers/sign-up');

/* Index page routes. */
router.get('/', ctrlIndex.index);
router.post('/', ctrlIndex.index);

/* Log In page routes.*/
router.get('/login', ctrlLogIn.logIn);

/* Sign Up page routes.*/
router.get('/signUp', ctrlSignUp.signUp);


module.exports = router;
