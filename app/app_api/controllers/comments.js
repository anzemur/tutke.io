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
  
module.exports.createComment = function(req, res) {
  vrniJsonOdgovor(odgovor, 200, {"status": "uspešno"});
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