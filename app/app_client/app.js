(function () {
  function setUp($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index/index.component.html',
        // controller: 'seznamCtrl',
        // controllerAs: 'vm'
      })
      .otherwise({redirecTo: '/'});
  }

  /* global angular */
  angular
    .module('tutke', ['ngRoute'])
    .config(['$routeProvider', setUp]);
})();
