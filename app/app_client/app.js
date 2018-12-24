var tutkeApp = angular.module('tutke', ['ngRoute']);

function setUp($routeProvider) {
  $routeProvider
    .when('/', {})
    .otherwise({redirecTo: '/'});
}

tutkeApp
  .config(['$routeProvider', setUp]);