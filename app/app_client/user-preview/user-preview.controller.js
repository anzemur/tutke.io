(() => {
  function userCtrl($location, authentication, $routeParams, $uibModal, user) {
    var vm = this;
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logedInUser = authentication.getCurrentUser();
    
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
      var sampleModalWindow = $uibModal.open({
        templateUrl: '/addCommentModalPopUp/addCommentModalPopUp.component.html',
        controller: 'addCommentCtrl',
        controllerAs: 'vm',
        resolve: {
          userPreviewData: function() {
            return {
              user: vm.previewedUser,
              logedInUser: vm.logedInUser
            };
          }
        }
      });

      sampleModalWindow.result.then(function (data) {
        if (typeof data != 'undefined')
          authorId = data.author;
          data.author = {
            _id = authorId,
            username = vm.user.username
          }
          vm.previewedUser.comments.push(data);
      }, function (error) {

      });
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