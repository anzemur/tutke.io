(function() {
  function addLectureController($uibModalInstance, lectures, userData) {
    var vm = this;
    vm.userData = userData;

    vm.lectureData = {
      price: '',
      title: '',
      description: '',
      lectureType: ''
    };

    vm.newLecturePopUp = {
      cancel: function() {
        $uibModalInstance.close();
      },
      close: function(response) {
        $uibModalInstance.close(response);
      }
    };

  
    /* Checks lecture create data. */
    vm.sendLectureData = function() {
      vm.addLectureError = '';
      if (!vm.lectureData.title || !vm.lectureData.description) {
        vm.addLectureError = 'Please enter all of the required data.';
        return false;
      }

      if (vm.lectureData.description.length < 200) {
        vm.addLectureError = 'Description must be at least 200 characters long.';
        return false;
      }

      if (vm.userData.user.role == 'tutor') {
        if (!vm.lectureData.price) {
          vm.addLectureError = 'Please enter all of the required data.';
          return false;
        }

        if (isNaN(vm.lectureData.price)) {
          vm.addLectureError = 'Price must be a number.';
          return false;
        }
      }

      vm.lectureData.lectureType = vm.userData.user.role == 'tutor' ? 'posted' : 'requested';

      lectures.addNewLecture(vm.lectureData).then(
        function success(response) {
          vm.newLecturePopUp.close(response.data);
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.addLectureError = `There was an error adding lecture: ${errMsg}.`;
          console.log(error);
        }
      )
    }
  }

  addLectureController.$inject = ['$uibModalInstance', 'lectures', 'userData'];

  /* global angular */
  angular
    .module('tutke')
    .controller('addLectureController', addLectureController);
})();