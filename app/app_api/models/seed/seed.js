'use strict';
/**
 * Adds base data to db. User have to run it manually.  
 * You can define base data in ./data folder.
 */
var mongoose = require('mongoose');
require('../db');
var User = mongoose.model('User');
var userData = require('./data/users')

mongoose.connection.once('open', function () {
  console.log('Started.')
  var countAdded = 0;
  var countError = 0;
  var total = userData.length;

  userData.forEach(u => {
    var user = new User();

    user.username = u.username;
    user.hashPassword(u.password);
    user.email = u.email;
    user.firstName = u.firstName;
    user.lastName = u.lastName;
    user.role = u.role;
    user.educationLevel = u.educationLevel;
    user.fieldOfEducation = u.fieldOfEducation;

    user.save((error) => {
      if (error) {
        console.log(error)
        countError++;
        closeConnection(countError, countAdded, total);
      } else {
        console.log(`Added user ${user.username}, role: ${user.role}.`);
        countAdded++;
        closeConnection(countError, countAdded, total);
      }
     });
  });
});

/* Closes connection and exits process when seeding is completed. */
function closeConnection(countError, countAdded, total) {
  if((countAdded + countError) == total) {
    console.log(`Finished with ${countError} errors - added ${countAdded}/${total} items.`);
    mongoose.connection.close();
    process.exit(0);
  }
}