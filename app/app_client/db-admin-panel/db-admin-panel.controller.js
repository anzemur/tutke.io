(function() {
  function adminCtrl($location, authentication, admin, $route) {
    var vm = this;

    vm.msgError = '';
    vm.msgSuccess = '';
    vm.isLoggedIn = authentication.isLoggedIn();

    /* Add background to body. */
    var body = angular.element(document.querySelector('body'));
    body.addClass('loginBody');

    /* Drops db. */
    vm.dropDb = function() {
      var confirmAlert = confirm('Are you sure you want to drop database? All of the data will be lost.');
      if(confirmAlert) {
        admin.dropDb().then(
          function success(response) {
            vm.msgSuccess = 'Drop successful.';
          },
          function error(error) {
            var errMsg = error.data ? error.data.message : error;
            vm.msgError = `There was an error while dropping database: ${errMsg}.`;
            console.log(error);
          }
        )
      }
    }

    /* Inits db.*/
    vm.initDb = function() {
      var confirmAlert = confirm('Are you sure you want to run database initialization?');
      if(confirmAlert) {
        admin.initDb().then(
          function success(response) {
            vm.msgSuccess = 'Init successful. ' + response.data ? response.data.message : '';
          },
          function error(error) {
            var errMsg = error.data ? error.data.message : error;
            vm.msgError = `There was an error while initializing database: ${errMsg}.`;
            console.log(error);
          }
        )
      }
    }


    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
      authentication.getCurrentUser().then(
        function success(response) {
          vm.user = response.data;

          if(vm.user.role != 'admin') {
            $.notify('You dont have the permission to do this!', "error");
            $location.path('/');
            $route.reload();
          }
        },
        function error(error) {
          vm.isLoggedIn = false;
          authentication.doLogOut();
          $location.path('/');
          $route.reload();
          console.log(error);
        }
      )
    } else {
      $.notify('You dont have the permission to do this!', "error");
      $location.path('/');
      $route.reload();
    }

  }
  adminCtrl.$inject = ['$location', 'authentication', 'admin', '$route'];

  /* global angular */
  angular
    .module('tutke')
    .controller('adminCtrl', adminCtrl);
})();