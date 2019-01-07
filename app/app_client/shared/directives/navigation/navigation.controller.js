(function() {
  function navigationCtrl($location, authentication, $route) {
    var navvm = this;

    navvm.isLoggedIn = authentication.isLoggedIn();
    
    navvm.logOut = function() {
      authentication.doLogOut();
      $location.path('/login');
      $route.reload();
    };
  }
  navigationCtrl.$inject = ['$location', 'authentication', '$route'];

  /* global angular */
  angular
    .module('tutke')
    .controller('navigationCtrl', navigationCtrl);
})();