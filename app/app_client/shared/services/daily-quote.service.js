(function() {
  function dailyQuote($http, authentication) {

    /* Inits db. */
    var getQuote = function() {
      return $http.get('http://quotes.rest/qod.json?category=students');
    }

    return {
      getQuote: getQuote
    };
  }
  dailyQuote.$inject = ['$http', 'authentication'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('dailyQuote', dailyQuote);
})();