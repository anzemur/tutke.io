(function () {
  function user($window, $http) {
    var getUser = function (userId) {
      return $http.get('/api/users/' + userId, {
        params: {
          populate: true,
        }
      });
    }

    return {
      getUser: getUser
    }
  }

  user.$inject = ['$window', '$http'];

  /* global angular */
  angular
    .module('tutke')
    .service('user', user);
})();