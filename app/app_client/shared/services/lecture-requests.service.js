(function() {
  function lecturesRequests($window, $http, authentication) {

    var updateLectureRequest = function(accept, id) {
      var body = {};
      body['status'] = accept ? 'accepted' : 'denied';
      return $http.put('api/lecturesRequests/' + id, body, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    var sendLectureRequest = function(body) {
      return $http.post('/api/lecturesRequests', body, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    return {
      updateLectureRequest: updateLectureRequest,
      sendLectureRequest: sendLectureRequest
    };
  }
  lecturesRequests.$inject = ['$window', '$http', 'authentication'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('lecturesRequests', lecturesRequests);
})();