'use strict';
/**
 * User have to run it manually.
 * Adds base data to db. Define data in ./data folder.
 */
var mongoose = require('mongoose');
require('../db');
var User = mongoose.model('User');
var userData = require('./data/users')
var comments = require('./data/comments')

mongoose.connection.once('open', function () {
  userData.forEach( u => {
    User.create(u, function (err) {
      if(err)
        console.log(err);
    });

    if(u.role == 'tutor') {
      User.update(
        { username: u.username },
        {
          $push: { comments: comments }
        },
        function (err) {
          if(err)
            console.log(err);
        }
      );
    }
  });
});