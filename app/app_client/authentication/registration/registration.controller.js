(function() {
  function registrationCtrl($location, authentication) {
    var vm = this;

    /* Add background to body. */
    var body = angular.element(document.querySelector('body'));
    body.addClass('loginBody');

    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';

    vm.registrationData = {
      username: '',
      password: '',
      reenterPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'tutor',
      educationLevel: '',
      fieldOfEducation: '',
      teachingInstitution: '',
    };

    vm.indexPage = $location.search().page || '/';

    vm.checkRegistrationData = function() {
      vm.msgError = '';
      console.log(vm.registrationData)
      for (var key in vm.registrationData) {
        if (!vm.registrationData[key]) {
          if(vm.registrationData.role == 'student' && key == "teachingInstitution") {
            continue;
          } else {
            vm.msgError = 'Please enter all of the required data and try again.';
            console.log(key)
            return false;
          }
        }
      }
      vm.doRegistration();
    };

    vm.doRegistration = function() {
      vm.msgError = '';
      authentication
        .doRegister(vm.registrationData)
        .then(
          function(success) {
            body.removeClass('loginBody');
            $location.search('page', null);
            $location.path(vm.indexPage);
          },
          function(error) {
            vm.msgError = error.data.message;
            console.log(error);
          }
        );
    }

    vm.changeRole = function(role) {
      vm.registrationData.role = role;
    }
  }

  registrationCtrl.$inject = ['$location', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .controller('registrationCtrl', registrationCtrl);
})();