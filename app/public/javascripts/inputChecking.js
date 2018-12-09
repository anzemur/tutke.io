/**
 * Edit lecture input checking.
 */
$('#edit-lecture-button').click(function (e){
  var error = false;
  var title = $('#titleEditLecture').val();
  var description = $('#modal-message').val();
  var lectureType = $('#editLectureType').val();
  var price;

  if(lectureType == 'posted') {
    price = $('#editLecturePrice').val();
    if(!price) {
      error = true;
      $.notify("Please enter price and try again.", "warn");
    } else {
      if(isNaN(price)) {
        error = true;
        $.notify("Price must be a number. Please enter valid data and try again.", "warn");
      }
    }
  }

  if(!title) {
    error = true;
    $.notify("Please enter title and try again.", "warn");
  }  

  if(!description) {
    error = true;
    $.notify("Please enter description and try again.", "warn");
  }  

  if(description.length < 200) {
    error = true;
    $.notify("Description must be at least 200 characters long. Please try again.", "warn");
  }  

  if(error) {
    e.preventDefault();
  }
});

/**
 * Edit user input checking.
 */
$('#edit-profile-button').click(function (e){
  var error = false;
  var password = $('#password').val();
  var password1 = $('#password1').val();
  var username = $('#username').val();

  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var usernameRegex = /^\w{6,}$/;
 
  /* Passwords */
  if(!password) {
    error = true;
    $.notify("Please enter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(!password1) {
    error = true;
    $.notify("Please reenter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password1)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(password != password1) {
    error = true;
    $.notify("Password mismatch. Please enter valid data and try again.", "warn");
  }


  /* Username */
  if(!username) {
    error = true;
    $.notify("Please enter username and try again.", "warn");
  } else {
    if(!usernameRegex.test(username)) {
      error = true;
      $.notify("Username must be at least 6 characters long and must contain alphanumeric values. Please enter valid data and try again.", "warn");
    }
  }
  
  if(error) {
    e.preventDefault();
  }
});

/**
 * Tutor sign up input checking.
 */
$('#signUpBtn').click(function (e){
  var error = false;
  var password = $('#password').val();
  var password1 = $('#password1').val();
  var username = $('#username').val();

  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var usernameRegex = /^\w{6,}$/;
 
  /* Passwords */
  if(!password) {
    error = true;
    $.notify("Please enter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(!password1) {
    error = true;
    $.notify("Please reenter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password1)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(password != password1) {
    error = true;
    $.notify("Password mismatch. Please enter valid data and try again.", "warn");
  }


  /* Username */
  if(!username) {
    error = true;
    $.notify("Please enter username and try again.", "warn");
  } else {
    if(!usernameRegex.test(username)) {
      error = true;
      $.notify("Username must be at least 6 characters long and must contain alphanumeric values. Please enter valid data and try again.", "warn");
    }
  }
  
  if(error) {
    e.preventDefault();
  }
});

/**
 * Student sign up input checking.
 */
$('#signUpBtn1').click(function (e){
  var error = false;
  var password = $('#password2').val();
  var password1 = $('#password3').val();
  var username = $('#username1').val();

  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var usernameRegex = /^\w{6,}$/;
 
  /* Passwords */
  if(!password) {
    error = true;
    $.notify("Please enter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(!password1) {
    error = true;
    $.notify("Please reenter password and try again.", "warn");
  } else {
    if(!passwordRegex.test(password1)) {
      error = true;
      $.notify("Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.", "warn");
    }
  }

  if(password != password1) {
    error = true;
    $.notify("Password mismatch. Please enter valid data and try again.", "warn");
  }


  /* Username */
  if(!username) {
    error = true;
    $.notify("Please enter username and try again.", "warn");
  } else {
    if(!usernameRegex.test(username)) {
      error = true;
      $.notify("Username must be at least 6 characters long and must contain alphanumeric values. Please enter valid data and try again.", "warn");
    }
  }
  
  if(error) {
    e.preventDefault();
  }
});
