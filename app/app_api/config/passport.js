var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, response) => {
    User.findOne(
      {
        username: username
      },
      (error, user) => {
        if (error)
          return response(error);
        if (!user) {
          return response(null, false, {
            message: 'Wrong username.'
          });
        }
        if (!user.checkPassword(password)) {
          return response(null, false, {
            message: 'Incorrect password.'
          });
        }
        return response(null, user);
      }
    );
  }
));