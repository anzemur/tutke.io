(function() {
  function lectures($window, $http) {

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
    var getLecturesCount = function(lectureType) {
      return $http.get('/api/lectures-count', {
        params: { 
          lectureType: lectureType
        }
      });
    }

    return {
      getLecturesPaginated: getLecturesPaginated,
      getLecturesCount: getLecturesCount
    };
  }
  lectures.$inject = ['$window', '$http'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('lectures', lectures);
})();