(() => {
  function indexCtrl($location, authentication, lectures) {
    var vm = this;
    vm.lecturesError = '';
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
          console.log(response)
        },
        function error(error) {
          vm.lecturesError = error.e;
          console.log(error.e);
        }
      )
    }

    vm.doSearch = function() {
      vm.pagination.page = 0;
      vm.getLecturesPaginated();
    }

    vm.changeLectureType = function(type) {
      if (vm.pagination.lectureType == type) {
        return;
      }
      vm.pagination.lectureType = vm.pagination.lectureType == 'posted' ? 'requested' : 'posted';
      vm.getLecturesPaginated();
    }

    vm.changePage = function(next) {
      next ? vm.pagination.page++ : vm.pagination.page--;
      vm.getLecturesPaginated();
    }


    
    /* Returns current logged in user. */
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

    /* Get initial lectures */
    vm.getLecturesPaginated();
  } 

  indexCtrl.$inject = ['$location', 'authentication', 'lectures'];

  /* global angular */
  angular
    .module('tutke')
    .controller('indexCtrl', indexCtrl);
})();