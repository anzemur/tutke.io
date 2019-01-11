(() => {
  function editUserCtrl($uibModalInstance, userData) {
    var vm = this;

    vm.formData = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      teachingInstitution: "",
      educationLevel: "",
      fieldOfEducation: ""
    }

    vm.userToEdit = userData;

    vm.editUserPopUp = {
      cancelEditUser: function () {
        $uibModalInstance.close();
      }
    };

    if (vm.userToEdit) {
      vm.formData.firstName = vm.userToEdit.firstName;
      vm.formData.lastName = vm.userToEdit.lastName;
      vm.formData.username = vm.userToEdit.username;
      vm.formData.email = vm.userToEdit.email;
      vm.formData.teachingInstitution = vm.userToEdit.teachingInstitution;
      vm.formData.educationLevel = vm.userToEdit.educationLevel;
      vm.formData.fieldOfEducation = vm.userToEdit.fieldOfEducation;
    }

  }
  editUserCtrl.$inject = ['$uibModalInstance', 'userData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('editUserCtrl', editUserCtrl);
})();