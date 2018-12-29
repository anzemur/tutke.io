(function() {
  function authentication($window, $http) {

    /**
     * Saves jwt to local storage.
     * @param {*} token 
     */
    var saveToken = function(token) {
      $window.localStorage['jwt'] = token;
    };
    
    /**
     * Returns jwt from local storage.
     */
    var getToken = function() {
     return $window.localStorage['jwt'];
    };
    
    /**
     * Register user via api.
     * @param {*} user 
     */
    var doRegister = function(user) {
      return $http.post('/api/register', user).then(
        function success(response) {
          saveToken(response.data.token);
        }
      );
    };

    /**
     * Log in via api.
     * @param {*} logInData 
     */
    var doLogIn = function(logInData) {
      return $http.post('/api/login', logInData).then(
        function success(response) {
          saveToken(response.data.token);
        }
      );
    };

    /**
     * Removes token on log out.
     */
    var doLogOut = function() {
      $window.localStorage.removeItem('token');
    };

    /**
     * Checks if user is logged in based on validation of jwt.
     */
    var isLoggedIn = function() {
      var token = getToken();
      if (token) {
        var tokenData = JSON.parse($window.atob(token.split('.')[1]));
        return tokenData.exDate > Date.now()/1000;
      } else {
        return false;
      }
    }

    /**
     * Return current logged in user.
     */
    var getCurrentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var tokenData = JSON.parse($window.atob(token.split('.')[1]));

        return $http({
          url: '/users/' + tokenData._id, 
          method: "GET",
          params: {populate: true}
       }).then(
        function success(response) {
          return response;
        });
      }
    }

    return {
      saveToken     : saveToken,
      getToken      : getToken,
      doRegister    : doRegister,
      doLogIn       : doLogIn,
      doLogOut      : doLogOut,
      isLoggedIn    : isLoggedIn,
      getCurrentUser: getCurrentUser

    };
  }
  authentication.$inject = ['$window', '$http'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('authentication', authentication);
})();