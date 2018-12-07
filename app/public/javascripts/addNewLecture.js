$('#addNewLectureBtn').click(function (e){
  var env = $('#env').val(); 
  var apiParams =  env == 'dev' ? 'http://localhost:3000/api' : 'https://tutke-io.herokuapp.com/api';
  
  var error = false;
  var author =  $('#newLectureAuthor').val();
  var title = $('#titleNewLecture').val();
  var lectureType = $('#newLectureType').val();
  var description = $('#modal-message').val();
  var price;
  if(lectureType == 'posted') {
    price = $('#priceNewLecture').val();
    if(!price) {
      error = true;
      $.notify("Please enter price and try again.", "warn");
    }

    if(isNaN(price)) {
      error = true;
      $.notify("Price must be a number. Please enter valid data and try again.", "warn");
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

  var body = {
    author: author,
    title: title,
    lectureType: lectureType,
    description: description
  }

  if(price) {
    body['price'] = price;
  }

  if(!error) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        async: true,
        url: apiParams + '/lectures',
        data: body,
        dataType: 'json',
        cache: false,
        success: function (result) {
          $.notify("Lecture created successfully!", "success");
        },
        error: function (err) {
          var error = err.responseText ? err.responseText : err;
          $.notify("Lecture creation failed: " + error, "error");
        }
    });
  }
});