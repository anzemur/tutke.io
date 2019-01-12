(function() {
  var navigation = function() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/directives/navigation/navigation.component.html',
      controller: 'navigationCtrl',
      controllerAs: 'navvm'
    };
  };
  
  /* global angular */
  angular
    .module('tutke')
    .directive('navigation', navigation);
})();