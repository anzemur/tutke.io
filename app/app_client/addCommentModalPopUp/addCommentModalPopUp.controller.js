(() => {
  function addCommentCtrl($uibModalInstance) {
    var vm = this;

    vm.commentPopUp = {
      cancelAddComment: function () {
        $uibModalInstance.close();
      }
    };
  }
  addCommentCtrl.$inject = ['$uibModalInstance'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addCommentCtrl', addCommentCtrl);
})();