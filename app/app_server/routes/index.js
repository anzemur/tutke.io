var express = require('express');
var router = express.Router();

var ctrlAngularApp = require('../controllers/angular-app');
router.get('/', ctrlAngularApp.angularApp);

/* Old routing when app was build on server side with express. */
var ctrlIndex = require('../controllers/index');
var ctrlLogIn = require('../controllers/log-in');
var ctrlSignUp = require('../controllers/sign-up');
var ctrlUsersProfile = require('../controllers/user-profile');
var ctrlMyAccount = require('../controllers/my-account');
var ctrlAddComment = require('../controllers/add-comment.js');
var ctrlAdminDb = require('../controllers/db');

/* Index page routes. */
router.get('/', ctrlIndex.index);
router.post('/', ctrlIndex.index);

/* Log In page routes.*/
router.get('/login', ctrlLogIn.renderLogIn);
router.post('/login', ctrlLogIn.logIn);

/* Sign Up page routes.*/
router.get('/signUp', ctrlSignUp.signUpRender);
router.post('/signUp', ctrlSignUp.signUp);

/* Users profile routes */
router.get('/user/:userId', ctrlUsersProfile.userProfile);
router.get('/user/:userId/comment', ctrlAddComment.renderCommentForm);
router.post('/user/:userId/comment', ctrlAddComment.addComment);
router.get('/user/:userId/comment/:commentId/edit', ctrlAddComment.editCommentPage);
router.post('/user/:userId/comment/:commentId/edit', ctrlAddComment.editCommentReq);

/* My account routes */
router.get('/account', ctrlMyAccount.myAccount);
router.get('/account/edit', ctrlMyAccount.editAccountPage);
router.post('/account/edit', ctrlMyAccount.editAccountReq);
router.get('/account/edit/lecture/:lectureId', ctrlMyAccount.editLecturePage);
router.post('/account/edit/lecture/:lectureId', ctrlMyAccount.editLectureReq);

/* Admin database routes */
router.get('/db', ctrlAdminDb.dbPage);

module.exports = router;
