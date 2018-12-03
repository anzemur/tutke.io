'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var errors = require('../../lib/errors');
var helperFunctions = require('../../lib/helper-functions');
var respondJson = helperFunctions.respondJson;

var vrniJsonOdgovor = function(odgovor, status, vsebina) {
  odgovor.status(status);
  odgovor.json(vsebina);
	};
	
var addComment = function(req, res, user) {
	if (!user) {
		respondJson(res, 404, errors.NotFound);
	}	else {
		user.comments.push({
			author: body.commentAuthor, //primerno samo za test
			rating: req.body.rating,
			commentText: req.body.comment
		});
		user.save(function(err, user) {
			var addedComment;
			if(err) {
				respondJson(res, 400, errors.BadRequest);
			} else {
				updateAvgRating(user._id);
				addComment = user.comments[user.comments.length - 1]
				respondJson(res, 201, addedComment);
			}
		});
	}
}

var updateAvgRating = function(idUser) {
	User
		.findById(idUser)
		.select('rating comments')
		.exec(
			function(err, user) {
				if(!napaka) {
					calcAvgRating(user);
				}
			}
		);
}

var calcAvgRating = function(user) {
	if (user.comments && user.comments.length > 0) {
		var numOfComments = user.comments.length;
		var sumOfRatings = 0;
		for (var i = 0; i < numOfComments; i++) {
      sumOfRatings += user.comments[i].rating;
		}
		var avgRating = parseInt(sumOfRatings / numOfComments, 10);
		user.rating = avgRating;
		user.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Povprečna ocena je posodobljena na " + avgRating + ".");
			}
		});
	}
}
  
module.exports.createComment = function(req, res) {
  var idUser = req.params.userId;
  if (idUser) {
		User
			.findById(idUser)
			.select(comments)
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
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};
  
module.exports.deleteComment = function(req, res) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
};