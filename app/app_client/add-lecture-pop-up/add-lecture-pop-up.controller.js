(function() {
  function addLectureController($uibModalInstance, userData) {
    var vm = this;
    vm.userData = userData;

    vm.newLecturePopUp = {
      cancel: function() {
        $uibModalInstance.close();
      }
    };
  }
  addLectureController.$inject = ['$uibModalInstance', 'userData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addLectureController', addLectureController);
})();