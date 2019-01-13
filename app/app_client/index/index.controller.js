(() => {
  function indexCtrl($location, authentication, lectures, lecturesRequests, $uibModal, dailyQuote) {
    var vm = this;

    /* Removes background from body. */
    var body = angular.element(document.querySelector('body'));
    body.removeClass('loginBody');

    vm.quote = '';
    vm.quoteAuthor = '';
    vm.lectures = [];
    vm.pendingLectureRequest = [];
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.numberOfPages = 0;
    
    vm.pagination = {
      search: '',
      page: 0,
      lectureType: 'posted'
    }

    /* Add new lecture modal popup. */
    vm.addNewLecturePopUp = function() {
      var addPopUp = $uibModal.open({
        templateUrl: '/add-lecture-pop-up/add-lecture-pop-up.component.html',
        controller: 'addLectureController',
        controllerAs: 'vm',
        resolve: {
          userData: function() {
            return {
              user: vm.user
            };
          }
        }
      });

      addPopUp.result.then(function(data) {
        if (typeof data != 'undefined') {
          data.author = {
            _id = vm.user._id,
            username = vm.user.username
          }

          if(vm.lectures.length == 0) {
            vm.lectures.push(data);
            vm.numberOfPages = 1;
          } else {
            vm.lectures = [data, ...vm.lectures];
          }
          vm.msgSuccess = 'Lecture was successfully added.';
        }
      }, function(error) {
        if(error === "backdrop click") return;
        if(error === "escape key press") return;

        var errMsg = error.data ? error.data.message : error;
        vm.msgError = `There was an error while adding a lecture: ${errMsg}.`;
        console.log(error);
      });
    }

    /* If user is logged in as admin he can delete the lecture. */
    vm.deleteLectureAdmin = function(lectureId) {
      vm.msgSuccess = '';
      vm.msgError = '';
      if (vm.user.role == 'admin') {
        lectures.deleteLecture(lectureId).then(
          function success(response) {
            vm.msgSuccess = 'Lecture successfully deleted.';
            vm.lectures = vm.lectures.filter(x => x._id != lectureId);
          },
          function error(error) {
            var errMsg = error.data ? error.data.message : error;
            vm.msgError = `There was an error while deleting lecture: ${errMsg}.`;
            console.log(error);
          }
        )
      } else {
        vm.msgError = 'You are not authorized to do this!';
      }
    }
    
    /* Returns paginated lectures. */
    getLecturesPaginated = function() {
      getLecturesCount();
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

    /* Returns number of pages. */
    getLecturesCount = function() {
      lectures.getLecturesCount(vm.pagination.lectureType, vm.pagination.search).then(
        function success(response) {
          vm.numberOfPages = response.data.pages;
        },
        function error(error) {
          vm.numberOfPages = 0;
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error getting lectures count: ${errMsg}.`;
          console.log(error);
        }
      )
    }

    /* Accepts or denies pending lecture request. */
    vm.answerToPendingLecture = function(accept, id) {
      vm.msgError = '';
      vm.msgSuccess = '';
      lecturesRequests.updateLectureRequest(accept, id).then(
        function success(response) {
          vm.msgSuccess = accept ? 'Lecture request accepted.' : 'Lecture request denied.';
          vm.user.lecturesRequests = vm.user.lecturesRequests.filter(x => x._id != id);
          vm.pendingLectureRequest = vm.pendingLectureRequest.filter(x => x._id != id);
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error while answering to lecture request: ${errMsg}.`;
          console.log(error);
        }
      )
    }

    /* Sends lecture request to user. */
    vm.sendLectureRequest = function(lectureId, posterId) {
      vm.msgError = '';
      vm.msgSuccess = '';
      vm.msgInfo = '';

      var lectureRequest = {
        lecture: lectureId,
        student: '',
        tutor: '',
        requestType: ''
      };

      if (vm.user.role == 'tutor') {
        lectureRequest.student = posterId,
        lectureRequest.tutor = vm.user._id,
        lectureRequest.requestType = 'tutorOffer'
      } else {
        lectureRequest.student = vm.user._id,
        lectureRequest.tutor = posterId,
        lectureRequest.requestType = 'studentRequest'
      }

      /* Sends a lecture request to lecture's author. */
      lecturesRequests.sendLectureRequest(lectureRequest).then(
        function success(response) {
          vm.msgSuccess = 'Lecture request sent.';
        },
        function error(error) {
          if(error.data && error.data.message && error.data.message.indexOf("E11000 duplicate key error")  !== -1) {
            vm.msgInfo = "You already sent request for this lecture.";  
          } else {
            vm.msgError = error.data ? error.data.message : error;
          }
          console.log(error);
        }
      )
    }

    /* Performs db search. */
    vm.doSearch = function() {
      vm.pagination.page = 0;
      getLecturesPaginated();
    }

    /* Changes lecture type in lectures filter. */
    vm.changeLectureType = function(type) {
      vm.pagination.search = '';
      vm.pagination.page = 0;
      if (vm.pagination.lectureType == type) {
        getLecturesPaginated();
        return;
      }
      vm.pagination.lectureType = vm.pagination.lectureType == 'posted' ? 'requested' : 'posted';
      getLecturesPaginated();
    }

    /* Changes page based on the 'next' value. */
    vm.changePage = function(next) {
      next ? vm.pagination.page++ : vm.pagination.page--;
      getLecturesPaginated();
    }

    getDailyQuote = function() {
      dailyQuote.getQuote().then(
        function success(response) {
          console.log(response.data);
        },
        function error(error) {
          vm.quote = 'Winners embrace hard work. They love the discipline of it, the trade-off they’re making to win. Losers, on the other hand, see it as punishment. And that’s the difference.';
          vm.quoteAuthor = 'Lou Holtz';
          console.log(error);
        }
      )
    }

    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
      authentication.getCurrentUser().then(
        function success(response) {
          vm.user = response.data;

          if(vm.user.role == 'tutor') {
            vm.pendingLectureRequest = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'studentRequest');
          } else {
            vm.pendingLectureRequest = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'tutorOffer');
          }

          var createdAtDate = new Date(vm.user.createdAt);
          if(new Date(createdAtDate.getTime() + 1*60000) > new Date()) {
            vm.msgInfo = 'Welcome to Tutke.io! Hope you will have an awesome time using our application!';
          }

          if(vm.user.role == 'admin') {
            vm.msgInfo = 'You are logged in as administrator. You can modify all of the application contents.';
          }
        },
        function error(error) {
          vm.isLoggedIn = false;
          authentication.doLogOut();
          console.log(error);
        }
      )
    }

    /* Get initial lectures */
    getLecturesPaginated();

    /* Get daily quote */
    // getDailyQuote();
  } 

  indexCtrl.$inject = ['$location', 'authentication', 'lectures', 'lecturesRequests', '$uibModal', 'dailyQuote'];

  /* global angular */
  angular
    .module('tutke')
    .controller('indexCtrl', indexCtrl);
})();