(() => {
  function userCtrl($location, authentication, $routeParams, $uibModal, user) {
    var vm = this;
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();
    
    vm.userId = $routeParams.userId

    vm.getUser = function () {
      user.getUser($routeParams.userId).then(
        function success(response) {
          vm.previewedUser = response.data;
          console.log(response.data)
        },
        function error(error) {
          vm.msgError = error.e;
          console.log(error.e);
        }
      )
    }

    vm.showAddReviewPopUp = function () {
      alert("Dodajmo komentar!");
    };

    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
      authentication.getCurrentUser().then(
        function success(response) {
          vm.user = response.data;
        },
        function error(error) {
          vm.isLoggedIn = false;
          authentication.doLogOut();
          console.log(error);
        }
      )
    }

    vm.getUser();
  }

  userCtrl.$inject = ['$location', 'authentication', '$routeParams', '$uibModal', 'user'];

  /* global angular */
  angular
    .module('tutke')
    .controller('userCtrl', userCtrl);

})();