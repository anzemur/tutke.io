(() => {
  function userCtrl($location, authentication, $routeParams, $uibModal, user) {
    var vm = this;
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logedInUser = authentication.getCurrentUser();
    
    vm.userId = $routeParams.userId

    /* Gets previewed user. */
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
      );
    }

    /* Add comment modal pop up. */
    vm.showAddReviewPopUp = function (commentId) {
      var sampleModalWindow = $uibModal.open({
        templateUrl: '/add-comment-modal-pop-up/add-comment-modal-pop-up.component.html',
        controller: 'addCommentCtrl',
        controllerAs: 'vm',
        resolve: {
          userPreviewData: function() {
            if(commentId == null){
              return {
                user: vm.previewedUser,
                logedInUser: vm.logedInUser
              };
            }else {
              return {
                user: vm.previewedUser,
                logedInUser: vm.logedInUser,
                commentToEdit: vm.previewedUser.comments.filter(x => x._id == commentId)[0]
              };
            }
          }
        }
      });

      sampleModalWindow.result.then(function (data) {
        if (typeof data != 'undefined') {
          authorId = data.author;
          data.author = {
            _id = authorId,
            username = vm.user.username
          }
          if (!data.edit){
            vm.previewedUser.rating = calcAvgUserRatingAdded(data.rating).toString();
            vm.previewedUser.comments.push(data);
            vm.msgSuccess = 'Comment was successfully added.';
          } else {
            vm.previewedUser.comments = vm.previewedUser.comments.filter(x => x._id != data._id);
            vm.previewedUser.comments.push(data);
            vm.previewedUser.rating = calcAvgUserRating().toString();
            vm.msgSuccess = 'Comment was successfully edited.';
          }
        }
      }, function (error) {
        if (error === "backdrop click") return;
        if (error === "escape key press") return;

        var errMsg = error.data ? error.data.message : error;
        vm.msgError = `There was an error while adding a comment: ${errMsg}.`;
        console.log(error);
      });
    };

    vm.deleteOwnComment = function (userId, commentId) {
      vm.msgSuccess = '';
      vm.msgError = '';
      user.deleteComment(userId, commentId).then(
        function success(response) {
          vm.msgSuccess = 'Comment successfully deleted.';
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error while deleting comment: ${errMsg}.`;
          console.log(error);
        }
      );
      vm.previewedUser.comments = vm.previewedUser.comments.filter(x => x._id != commentId);
      vm.previewedUser.rating = calcAvgUserRating().toString();
      console.log(vm.previewedUser.rating);
    };

    /* Calculates the new updated user rating. */
    function calcAvgUserRatingAdded(newRating){
      var numOfComments = vm.previewedUser.comments.length;
      var sumOfRatings = 0;
      for (var i = 0; i < numOfComments; i++) {
        sumOfRatings += vm.previewedUser.comments[i].rating;
      }
      sumOfRatings += newRating;
      var avgRating = (sumOfRatings / (numOfComments+1));
      return Math.round(avgRating);
    };

    function calcAvgUserRating() {
      var numOfComments = vm.previewedUser.comments.length;
      if(numOfComments == 0) return 0;
      var sumOfRatings = 0;
      for (var i = 0; i < numOfComments; i++) {
        sumOfRatings += vm.previewedUser.comments[i].rating;
      }
      var avgRating = (sumOfRatings / numOfComments);
      return Math.round(avgRating);
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
    } else {
      authentication.doLogOut();
      $location.path('/login');
      $route.reload();
    }

    vm.getUser();
  }

  userCtrl.$inject = ['$location', 'authentication', '$routeParams', '$uibModal', 'user'];

  /* global angular */
  angular
    .module('tutke')
    .controller('userCtrl', userCtrl);

})();