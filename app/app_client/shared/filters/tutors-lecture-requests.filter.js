(() => {
  var getFilteredTutorsRequests = function() {
    return function(requests) {
      return requests.filter(x => x.status == 'pending' && x.requestType == 'tutorOffer');
      //return requests.filter(x => x.status == 'accepted' && x.requestType == 'tutorOffer');
    };
  };

  /* global angular */
  angular
    .module('tutke')
    .filter('getFilteredTutorsRequests', getFilteredTutorsRequests);
})();