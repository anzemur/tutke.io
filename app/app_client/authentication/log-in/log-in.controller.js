(function() {
  function loginInCtrl($location, authentication) {
    var vm = this;

    /* Add background to body. */
    var body = angular.element(document.querySelector('body'));
    body.addClass('loginBody');

    vm.logInData = {
      username: '',
      password: ''
    };

    vm.logInError = '';
    vm.indexPage = $location.search().page || '/';

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
            body.removeClass('loginBody');
            $location.search('page', null);
            $location.path(vm.indexPage);
          },
          function(error) {
            vm.logInError = error.data.message;
            vm.logInData.password = '';
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