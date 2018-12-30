(() => {
  function indexCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    authentication.getCurrentUser().then(
      function success(response) {
        vm.user = response.data;
      },
      function error(error) {
        vm.isLoggedIn = false;
        authentication.doLogOut();
        console.log(error.e);
      }
    )
  } 

  indexCtrl.$inject = ['$location', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .controller('indexCtrl', indexCtrl);
})();