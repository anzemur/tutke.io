(function () {
  function setUp($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index/index.component.html',
        controller: 'indexCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'authentication/log-in/log-in.component.html',
        controller: 'loginInCtrl',
        controllerAs: 'vm'
      })
      // .when('/registration', {
      //   templateUrl: 'authentication/registration/registration.component.html',
      //   controller: 'loginInCtrl',
      //   controllerAs: 'vm'
      // })
      .otherwise({redirecTo: '/'});
    $locationProvider.html5Mode(true);
  }

  /* global angular */
  angular
    .module('tutke', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', setUp]);
})();
