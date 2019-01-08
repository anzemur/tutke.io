(() => {
  function profileCtrl($window, $location, authentication, lectures, lecturesRequests, $routeParams, $uibModal, user, $route, $scope) {
    var vm = this;
    
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logedInUser = authentication.getCurrentUser();
    
    vm.userId = $routeParams.userId;
    
    vm.lecturesRequestsAccepted = [];
    vm.lecturesRequestsPending = [];
    
    vm.pagination = {
      search: '',
      page: 0,
      lectureType: 'posted'
    }
    
    /* Returns paginated lectures. */
    vm.getLecturesPaginated = function() {
      vm.msgError = '';
      lectures.getLecturesPaginated(vm.pagination).then(
        function success(response) {
          vm.lectures = response.data;
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error getting lectures: ${errMsg}.`;
          console.log(error);
        }
      )
    }
    
    /* Changes page based on the 'next' value. */
    vm.changePage = function(next) {
      next ? vm.pagination.page++ : vm.pagination.page--;
      vm.getLecturesPaginated();
    };
    
    /* Deletes user from database and loads login page. */
    vm.deleteUser = function(id) {
      vm.msgError = '';
      user.deleteUser(id).then(
        function success(response) {
          $location.path('/login');
          $route.reload();
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error when trying to delete user: ${errMsg}.`;
          console.log(error);
        }
      )
    }
    
    /* Updates user info. */
    vm.editUser = function(id) {
      console.log('edit '+ id);
    }

    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
      authentication.getCurrentUser().then(
        function success(response) {
          vm.user = response.data;

          if(vm.user.role == 'tutor') {
            vm.lecturesRequestsAccepted = vm.user.lecturesRequests.filter(x => x.status == 'accepted' && x.requestType == 'studentRequest');
            vm.lecturesRequestsPending = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'tutorOffer');
          } else {
            vm.lecturesRequestsAccepted = vm.user.lecturesRequests.filter(x => x.status == 'accepted' && x.requestType == 'tutorOffer');
            vm.lecturesRequestsPending = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'studentRequest');
          }

          var createdAtDate = new Date(vm.user.createdAt);
          if(new Date(createdAtDate.getTime() + 1*60000) > new Date()) {
            vm.msgInfo = 'Welcome to Tutke.io. Hope you will have an awesome time using our application!';
          }
        },
        function error(error) {
          vm.isLoggedIn = false;
          authentication.doLogOut();
          console.log(error);
        }
      )
    }

    vm.getLecturesPaginated();
  }

  profileCtrl.$inject = ['$window', '$location', 'authentication', 'lectures', 'lecturesRequests', '$routeParams', '$uibModal', 'user' , '$route', '$scope'];

  /* global angular */
  angular
    .module('tutke')
    .controller('profileCtrl', profileCtrl);
})();