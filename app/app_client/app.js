(function () {
  function setUp($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index/index.component.html',
        // controller: 'seznamCtrl',
        // controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'authentication/log-in/log-in.component.html',
        controller: 'loginInCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirecTo: '/'});
    $locationProvider.html5Mode(true);
  }

  /* global angular */
  angular
    .module('tutke', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', setUp]);
})();
