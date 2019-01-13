(function () {
  function setUp($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.headers.get = { 'X-Frame-Options': 'DENY' };

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
      .when('/registration', {
        templateUrl: 'authentication/registration/registration.component.html',
        controller: 'registrationCtrl',
        controllerAs: 'vm'
      })
      .when('/user/:userId', {
        templateUrl: 'user-preview/user-preview.component.html',
        controller: 'userCtrl',
        controllerAs: 'vm'
      })
      .when('/account', {
        templateUrl: 'profile/profile.component.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/db', {
        templateUrl: 'db-admin-panel/db-admin-panel.component.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirecTo: '/'});
    $locationProvider.html5Mode(true);
  }

  /* global angular */
  angular
    .module('tutke', ['ngRoute', 'ui.bootstrap', 'vcRecaptcha'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', setUp]);
})();
