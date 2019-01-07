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
      recaptchaResponse: ''
    };

    vm.indexPage = $location.search().page || '/';

    /* Checks if all of the input data is correct. */
    vm.checkRegistrationData = function() {
      vm.msgError = '';
      for (var key in vm.registrationData) {
        if (!vm.registrationData[key]) {
          if(key == "teachingInstitution") {
            continue;
          } else {
            vm.msgError = 'Please enter all of the required data and try again.';
            console.log(key)
            return false;
          }
        }
      }
      if(vm.registrationData.password != vm.registrationData.reenterPassword) {
        vm.msgError = 'Password mismatch. Please try again.';
        return false;
      }
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      var usernameRegex = /^\w{6,}$/;

      if(!passwordRegex.test(vm.registrationData.password)) {
        vm.msgError = "Password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. Please enter valid data and try again.";
        return false;
      }

      if(!usernameRegex.test(vm.registrationData.username)) {
        vm.msgError = "Username must be at least 6 characters long and must contain alphanumeric values. Please enter valid data and try again.";
        return false;
      }

      vm.doRegistration();
    };

    /* Performs registration and redirects user to index. */
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
            if (error.data && error.data.message && error.data.message.errmsg && error.data.message.errmsg.indexOf("email_1 dup key")  !== -1) {
              vm.msgError = 'User with this email already exists. Please try again.'
            } else if (error.data && error.data.message && error.data.message.errmsg && error.data.message.errmsg.indexOf("username_1 dup key")  !== -1) {
              vm.msgError = 'User with this username already exists. Please try again.'
            } else {
              vm.msgError = error.data ? ( error.data.message ? error.data.message : error) : error;
            }
            console.log(error);
          }
        );
    }

    /* Changes role on navigation switch. */
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