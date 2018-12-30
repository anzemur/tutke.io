(() => {
  function indexCtrl($location, authentication, lectures, lecturesRequests) {
    var vm = this;
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.pagination = {
      search: '',
      page: 0,
      lectureType: 'posted'
    }
    

    vm.getLecturesPaginated = function() {
      lectures.getLecturesPaginated(vm.pagination).then(
        function success(response) {
          vm.lectures = response.data;
        },
        function error(error) {
          vm.msgError = error.e;
          console.log(error.e);
        }
      )
    }

    vm.answerToPendingLecture = function(accept, id) {
      lecturesRequests.updateLectureRequest(accept, id).then(
        function success(response) {
          vm.msgSuccess = accept ? 'Lecture request accepted.' : 'Lecture request denied.';
          vm.user.lecturesRequests = vm.user.lecturesRequests.filter(x => x._id != id);
          console.log(vm.msgSuccess)
        },
        function error(error) {
          vm.msgError = error.e;
          console.log(error.e);
        }
      )
    }

    /* Performs db search. */
    vm.doSearch = function() {
      vm.pagination.page = 0;
      vm.getLecturesPaginated();
    }

    /* Changes lecture type in lectures filter. */
    vm.changeLectureType = function(type) {
      if (vm.pagination.lectureType == type) {
        return;
      }
      vm.pagination.lectureType = vm.pagination.lectureType == 'posted' ? 'requested' : 'posted';
      vm.getLecturesPaginated();
    }

    /* Changes page based on the 'next' value. */
    vm.changePage = function(next) {
      next ? vm.pagination.page++ : vm.pagination.page--;
      vm.getLecturesPaginated();
    }

    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
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

    /* Get initial lectures */
    vm.getLecturesPaginated();
  } 

  indexCtrl.$inject = ['$location', 'authentication', 'lectures', 'lecturesRequests'];

  /* global angular */
  angular
    .module('tutke')
    .controller('indexCtrl', indexCtrl);
})();