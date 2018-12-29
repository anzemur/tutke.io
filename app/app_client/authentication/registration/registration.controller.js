(function() {
  function registrationCtrl($location, authentication) {
    var vm = this;

    vm.registrationData = {
      username: '',
      password: '',
      reenterPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      educationLevel: '',
      fieldOfEducation: '',
      teachingInstitution: '',
    };


    vm.registrationError = '';
    vm.indexPage = $location.search().page || '/';

    vm.checkRegistrationData = function() {
      vm.registrationError = '';

      for (var key in registrationData) {
        if (!registrationData[key]) {
          vm.registrationError = 'Please enter all of the required data and try again.';
          return false;
        }
      }
      vm.doRegistration();
    };


    vm.doRegistration = function() {
      vm.registrationError = '';

      authentication
        .doRegister(vm.registrationData)
        .then(
          function(success) {
            $location.search('page', null);
            $location.path(vm.indexPage);
          },
          function(error) {
            vm.registrationError = error.data.message;
          }
        );
    }
  }

  registrationCtrl.$inject = ['$location', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .controller('registrationCtrl', registrationCtrl);
})();