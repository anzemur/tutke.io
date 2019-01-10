(function() {
  function lectures($http, authentication) {

    /* Returns a page of lectures. */
    var getLecturesPaginated = function(options) {
      return $http.get('/api/lectures', {
        params: { 
          populate: true,
          page: options.page,
          search: options.search,
          lectureType: options.lectureType
        }
      });
    }

    /* Returns number of pages and lecture count. */
    var getLecturesCount = function(lectureType, search) {
      return $http.get('/api/lectures-count', {
        params: { 
          lectureType: lectureType,
          search: search
        }
      });
    }

    /* Deletes lecture. */
    var deleteLecture = function(lectureId) {
      return $http.delete('/api/lectures/' + lectureId, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    return {
      getLecturesPaginated: getLecturesPaginated,
      getLecturesCount    : getLecturesCount,
      deleteLecture       : deleteLecture
    };
  }
  lectures.$inject = ['$http', 'authentication'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('lectures', lectures);
})();