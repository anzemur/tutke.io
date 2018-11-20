var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');
var ctrlLogIn = require('../controllers/logIn');

/* Index page routes. */
router.get('/', ctrlIndex.index);
router.post('/', ctrlIndex.index);

/* Log In page routes.*/
router.get('/login', ctrlLogIn.logIn);

module.exports = router;
