(() => {
  function addCommentCtrl($uibModalInstance, userPreviewData) {
    var vm = this;

    vm.userPreviewData = userPreviewData;

    vm.commentPopUp = {
      cancelAddComment: function () {
        $uibModalInstance.close();
      }
    };
  }
  addCommentCtrl.$inject = ['$uibModalInstance', 'userPreviewData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addCommentCtrl', addCommentCtrl);
})();