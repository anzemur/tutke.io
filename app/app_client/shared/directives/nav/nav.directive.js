(() => {
  var nav = () => {
    return {
      restrict: 'EA',
      templateUrl: '/shared/directives/nav/nav.component.html'
    };
  };
  
  /* global angular */
  angular
    .module('tutke')
    .directive('nav', nav);
})();