(function() {
  var foot = function() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/directives/foot/foot.component.html'
    };
  };
  
  /* global angular */
  angular
    .module('tutke')
    .directive('foot', foot);
})();