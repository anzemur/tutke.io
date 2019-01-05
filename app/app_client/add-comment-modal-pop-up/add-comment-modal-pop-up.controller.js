(() => {
  function addCommentCtrl($uibModalInstance, user, userPreviewData) {
    var vm = this;

    vm.userPreviewData = userPreviewData;

    vm.commentPopUp = {
      cancelAddComment: function () {
        $uibModalInstance.close();
      },
      close: function(response) {
        $uibModalInstance.close(response);
      }
    };

    vm.sendingCommentData = function () {
      vm.commentFormError = "";
      if (!vm.formData || (!vm.formData.comment && !vm.formData.rating)){
        vm.commentFormError = "Please write a comment and add a rating!";
        return false;
      } else if (!vm.formData.comment) {
        vm.commentFormError = "Please add a comment!";
        return false;
      } else if (!vm.formData.rating) {
        vm.commentFormError = "Please add a star rating!";
        return false;
      } else {
        console.log(vm.userPreviewData.logedInUser.$$state.value.data.username)
        vm.addComment(vm.userPreviewData.user._id, {
          author: vm.userPreviewData.logedInUser.$$state.value.data._id,
          comment: vm.formData.comment,
          rating: vm.formData.rating
        });
      }
    };

    vm.addComment = function(userId, formData) {
      user.addCommentForUserId(userId, {
        author: formData.author,
        commentText: formData.comment,
        rating: formData.rating
      }).then(
        function success(response){
          vm.commentPopUp.close(response.data);
          console.log('Comment was added!');
        },
        function error(response) {
          vm.commentFormError = "Adding a review did not succeed, please try again!"
        }
      );
    };
  }
  addCommentCtrl.$inject = ['$uibModalInstance', 'user', 'userPreviewData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addCommentCtrl', addCommentCtrl);
})();