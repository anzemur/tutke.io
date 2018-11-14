var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');

/* GET index page. */
router.get('/', ctrlIndex.index);

module.exports = router;
