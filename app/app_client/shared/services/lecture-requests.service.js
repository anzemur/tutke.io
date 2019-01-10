(function() {
  function lecturesRequests($window, $http, authentication) {

    /* Updates lecture request. */
    var updateLectureRequest = function(accept, id) {
      var body = {};
      body['status'] = accept ? 'accepted' : 'denied';
      return $http.put('api/lecturesRequests/' + id, body, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    /* Sends lecture request to other user. */
    var sendLectureRequest = function(body) {
      return $http.post('/api/lecturesRequests', body, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    /* Deletes lecture request and its references from users. */
    var deleteLectureRequest = function(id) {
      return $http.delete('api/lecturesRequests/' + id, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    } 

    return {
      updateLectureRequest: updateLectureRequest,
      sendLectureRequest  : sendLectureRequest,
      deleteLectureRequest: deleteLectureRequest
    };
  }
  lecturesRequests.$inject = ['$window', '$http', 'authentication'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('lecturesRequests', lecturesRequests);
})();