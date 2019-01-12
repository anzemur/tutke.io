'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

/**
 * Creates a comment model and stars its addition to user.
 * Body: {Comment} Comment model.
 * Path parameter: {string} userId.
 */
module.exports.createComment = function(req, res) {
  var idUser = req.params.userId;
  if (idUser) {
		User
			.findById(idUser)
			.select('comments')
			.exec(
				function(err, user) {
					if(err) {
						respondJson(res, 400, errors.BadRequest);
					} else {
						addComment(req, res, user)
					}
				}
			);
	} else {
		respondJson(res, 400, errors.BadRequest);
	}
};

/**
 * Adds comment to the user's comments.
 * @param {any} req 
 * @param {ayn} res 
 * @param {User} user 
 */
var addComment = function(req, res, user) {
	if (!user) {
		respondJson(res, 404, errors.NotFound);
	}	else {
		user.comments.push({
			author: req.body.author,
			rating: req.body.rating,
			commentText: req.body.commentText
		});
		user.save(function(err, user) {
			var addedComment;
			if(err) {
				respondJson(res, 400, errors.BadRequest + err);
			} else {
				updateAvgRating(user._id);
				addedComment = user.comments[user.comments.length - 1]
				respondJson(res, 201, addedComment);
			}
		});
	}
}

/**
 * Updates user's rating.
 * @param {string} userId 
 */
var updateAvgRating = function(userId) {
	User
		.findById(userId)
		.select('rating comments')
		.exec((err, user) => {
				if(!err) {
					calcAvgRating(user);
				} else {
					console.log('Average rating couldn\'t be computed for user with id: ' + userId);
				}
			}
		);
}

/**
 * Calculates and updates the user's rating.
 * @param {User} user 
 */
var calcAvgRating = (user) => {
	if (user.comments && user.comments.length > 0) {
		var numOfComments = user.comments.length;
		var sumOfRatings = 0;
		for (var i = 0; i < numOfComments; i++) {
      sumOfRatings += user.comments[i].rating;
		}
		var avgRating = Math.round(sumOfRatings / numOfComments);
		user.rating = avgRating;
		user.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Tutor's rating was updated to: " + avgRating + ".");
			}
		});
	} else {
		user.rating = 0;
		user.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Tutor's rating was updated to: " + avgRating + ".");
			}
		});
	}
}
  
module.exports.getComment = function(req, res) {
  if (req.params && req.params.userId && req.params.commentId) {
		User
			.findById(req.params.userId)
			.select('username comments')
			.exec(
				function(err, user) {
					var comment;
					if(!user) {
						respondJson(res, 404, errors.NotFound);
						return;
					} else if(err) {
						respondJson(res, 500, err.message);
          	return;
					}
					if(user.comments && user.comments.length > 0) {
						comment = user.comments.id(req.params.commentId);
						if(!comment) {
							respondJson(res, 404, errors.NotFound);
						} else {
							respondJson(res, 200, comment);
						}
					} else {
						respondJson(res, 404, errors.NotFound);
					}
				}
			);
	} else {
		respondJson(res, 400, errors.BadRequest);
	}
};
  
module.exports.updateComment = function(req, res) {
  if(!req.params.userId || !req.params.commentId) {
		respondJson(res, 400, errors.BadRequest);
		return;
	}
	User
		.findById(req.params.userId)
		.select('comments')
		.exec(
			function(err, user){
				if(!user) {
					respondJson(res, 404, errors.NotFound);
					return;
				} else if(err) {
					respondJson(res, 500, err.message);
					return;
				}
				if(user.comments && user.comments.length > 0) {
					var currentComment = user.comments.id(req.params.commentId);
					if(!currentComment) {
						respondJson(res, 404, errors.NotFound);
					} else {
						currentComment.author = req.body.author;
						currentComment.rating = req.body.rating;
						currentComment.commentText = req.body.commentText;
						user.save(function(err, user){
							if(err) {
								respondJson(res, 400, errors.BadRequest);
							} else {
								updateAvgRating(user._id)
								respondJson(res, 200, currentComment);
							}
						});
					}
				} else {
					respondJson(res, 404, errors.NotFound);
				}
			}
		);
};
  
module.exports.deleteComment = function(req, res) {
  if (!req.params.userId || !req.params.commentId){
		respondJson(res, 400, errors.BadRequest);
		return;
	}
	User
		.findById(req.params.userId)
		.exec(
			function(err, user){
				if(!user) {
					respondJson(res, 404, errors.NotFound);
					return;
				} else if(err) {
					respondJson(res, 500, err.message);
					return;
				}
				if(user.comments && user.comments.length > 0) {
					if(!user.comments.id(req.params.commentId)) {
						respondJson(res, 404, errors.NotFound);
					} else {
						user.comments.id(req.params.commentId).remove();
						user.save(function(err){
							if(err) {
								respondJson(res, 500, err.message);
							} else {
								updateAvgRating(user._id);
								respondJson(res, 204, null);
							}
						});
					}
				} else {
					respondJson(res, 404, errors.NotFound);
				}
			}
		);
};