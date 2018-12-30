(function() {
  function lectures($window, $http) {

    var getLecturesPaginated = function(options) {
      return $http.get('/api/lectures/', {
        params: { 
          populate: true,
          page: options.page,
          search: options.search,
          lectureType: options.lectureType
        }
      });
    }

    var getLectureById = function(id) {

    }

    var createNewLecture = function() {

    }

    var deleteLecture = function() {

    }

    var updateLecture = function() {

    }

    return {
      getLecturesPaginated: getLecturesPaginated
    };
  }
  lectures.$inject = ['$window', '$http'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('lectures', lectures);
})();