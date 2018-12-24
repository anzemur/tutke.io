(function () {
  function setUp($routeProvider) {
    $routeProvider
      .when('/', {})
      .otherwise({redirecTo: '/'});
  }

  /* global angular */
  angular
    .module('tutke', ['ngRoute'])
    .config(['$routeProvider', setUp]);
})();
