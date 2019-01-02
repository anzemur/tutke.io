(() => {
  function addCommentCtrl($uibModalInstance, userPreviewData) {
    var vm = this;

    vm.userPreviewData = userPreviewData;

    vm.commentPopUp = {
      cancelAddComment: function () {
        $uibModalInstance.close();
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
        console.log(vm.formData);
        return false;
      }
    };
  }
  addCommentCtrl.$inject = ['$uibModalInstance', 'userPreviewData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addCommentCtrl', addCommentCtrl);
})();