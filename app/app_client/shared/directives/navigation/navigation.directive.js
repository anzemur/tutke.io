(function() {
  var navigation = function() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/directives/navigation/navigation.component.html'
    };
  };
  
  /* global angular */
  angular
    .module('tutke')
    .directive('navigation', navigation);
})();