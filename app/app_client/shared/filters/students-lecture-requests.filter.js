(() => {
  var getFilteredStudentsRequests = function() {
    return function(requests) {
      return requests.filter(x => x.status == 'pending' && x.requestType == 'studentRequest');
    }
  }

  /* global angular */
  angular
    .module('tutke')
    .filter('getFilteredStudentsRequests', getFilteredStudentsRequests);
})();