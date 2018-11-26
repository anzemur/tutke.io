var apiParams = process.env.NODE_ENV === 'production' ? 'heroku_url/api' : 'http://localhost:' + (process.env.PORT || '3000') + '/api';

$('#addNewLectureBtn').click(function (e){
  var author =  $('#newLectureAuthor').val();
  var title = $('#titleNewLecture').val();
  var lectureType = $('#newLectureType').val();
  var description = $('#modal-message').val();
  var price;
  if(lectureType == 'posted') {
    price = $('#priceNewLecture').val();
  }

  // TODO: check 

  var body = {
    author: author,
    title: title,
    lectureType: lectureType,
    description: description
  }

  if(price) {
    body['price'] = price;
  }


  e.preventDefault();
  $.ajax({
      type: "POST",
      async: false,
      url: apiParams + '/lectures',
      data: JSON.stringify(body),
      dataType: 'json',
      cache: false,
      success: function (result) {
        alert("kulio");
      },
      error: function () {
          alert("server error");
      }
  });
});