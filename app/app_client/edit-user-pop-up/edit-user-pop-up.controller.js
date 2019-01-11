(() => {
  function editUserCtrl($uibModalInstance, userData, user) {
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
      },
      close: function(response) {
        $uibModalInstance.close(response);
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

    vm.sendEditData = function(){
      vm.editUserFormError = "";
      if (!vm.formData.firstName || !vm.formData.lastName || !vm.formData.username || !vm.formData.email || !vm.formData.educationLevel || !vm.formData.fieldOfEducation){
        vm.editUserFormError = "Please fill in all the required fields!";
        return false;
      }else {
        vm.editUserWithId(vm.userToEdit._id, vm.formData);
      } 
    };

    vm.editUserWithId = function(userId, formData) {
      user.editUser(userId, formData).then(
        function success(response) {
          vm.editUserPopUp.close(response.data);
          console.log('User was edited!');
        },
        function error(response) {
          vm.editUserFormError = "Editing did not succeed, please try again!"
        }
      );
    }

  }
  editUserCtrl.$inject = ['$uibModalInstance', 'userData', 'user'];

  /* global angular */
  angular
    .module('tutke')
    .controller('editUserCtrl', editUserCtrl);
})();