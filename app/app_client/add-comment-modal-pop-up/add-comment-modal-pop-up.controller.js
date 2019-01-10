(() => {
  function addCommentCtrl($uibModalInstance, user, userPreviewData) {
    var vm = this;

    vm.userPreviewData = userPreviewData;
    vm.comment = userPreviewData.commentToEdit;
    console.log('lalala', vm.comment);
  
    vm.formData = {
      author: "",
      comment: "",
      rating: ""
    }

    vm.commentPopUp = {
      cancelAddComment: function () {
        $uibModalInstance.close();
      },
      close: function(response) {
        $uibModalInstance.close(response);
      }
    };

    if(vm.comment){
      console.log('aaaa', vm.comment);
      vm.formData.comment = vm.comment.commentText;
      vm.formData.rating = vm.comment.rating;
    }

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
        // console.log(vm.userPreviewData.logedInUser.$$state.value.data.username)
        if (!vm.comment) {
          vm.addComment(vm.userPreviewData.user._id, {
            author: vm.userPreviewData.logedInUser.$$state.value.data._id,
            comment: vm.formData.comment,
            rating: vm.formData.rating
          });
        } else {
          vm.editComment(vm.userPreviewData.user._id, vm.comment._id, {
            author: vm.userPreviewData.logedInUser.$$state.value.data._id,
            comment: vm.formData.comment,
            rating: vm.formData.rating
          });
        }
      }
    };

    vm.addComment = function(userId, formData) {
      user.addCommentToUser(userId, {
        author: formData.author,
        commentText: formData.comment,
        rating: formData.rating
      }).then(
        function success(response){
          response.data.edit = true;
          vm.commentPopUp.close(response.data);
          console.log('Comment was added!');
        },
        function error(response) {
          vm.commentFormError = "Adding a review did not succeed, please try again!"
        }
      );
    };

    vm.editComment = function (userId, commentId, formData) {
      user.editCommentToUser(userId, commentId, {
        author: formData.author,
        commentText: formData.comment,
        rating: formData.rating
      }).then(
        function success(response) { 
          response.data.edit = true;
          vm.commentPopUp.close(response.data);
          console.log('Comment was edited!');
        },
        function error(response) {
          vm.commentFormError = "Editing review did not succeed, please try again!"
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