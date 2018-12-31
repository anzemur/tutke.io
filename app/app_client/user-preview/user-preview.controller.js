(() => {
  function userCtrl($location, authentication, $routeParams, user) {
    var vm = this;
    vm.msgError = '';
    vm.msgSuccess = '';

    vm.test = 'llalala'
    
    vm.userId = $routeParams.userId

    vm.getUser = function () {
      user.getUser($routeParams.userId).then(
        function success(response) {
          vm.user = response.data;
          console.log(response.data)
        },
        function error(error) {
          vm.msgError = error.e;
          console.log(error.e);
        }
      )
    }

    vm.getUser();
  }

  userCtrl.$inject = ['$location', 'authentication', '$routeParams', 'user'];

  /* global angular */
  angular
    .module('tutke')
    .controller('userCtrl', userCtrl);

})();