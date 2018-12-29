(function() {
  function loginInCtrl($location, authentication) {
    var vm = this;

    vm.logInData = {
      username: '',
      password: ''
    };

    vm.logInError = "fsdfsd";

    // vm.prvotnaStran = $location.search().stran || '/';

    vm.checkLogInData = function() {
      vm.logInError = '';

      if (!vm.logInData.username || !vm.logInData.password) {
        vm.logInError = 'Please enter username and password then try again.';
        return false;
      } else {
        vm.doLogIn();
      }
    };


    vm.doLogIn = function() {
      vm.logInError = '';

      authentication
        .doLogIn(vm.logInData)
        .then(
          function(success) {
            // $location.search('stran', null);
            // $location.path(vm.prvotnaStran);
          },
          function(error) {
            vm.logInError = error.data.message;
          }
        );
    }
  }

  loginInCtrl.$inject = ['$location', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .controller('loginInCtrl', loginInCtrl);
})();