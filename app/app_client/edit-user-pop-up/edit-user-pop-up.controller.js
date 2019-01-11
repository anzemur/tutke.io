(() => {
  function editUserCtrl($uibModalInstance, userData) {
    var vm = this;

    vm.userToEdit = userData;

    vm.editUserPopUp = {
      cancelEditUser: function () {
        $uibModalInstance.close();
      }
    };
  }
  editUserCtrl.$inject = ['$uibModalInstance', 'userData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('editUserCtrl', editUserCtrl);
})();