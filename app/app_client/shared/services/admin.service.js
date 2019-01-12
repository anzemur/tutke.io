(function() {
  function admin($http, authentication) {

    /* Inits db. */
    var initDb = function() {
      return $http.get('api/init/', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    /* Drops db. */
    var dropDb = function() {
      return $http.get('api/drop/', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    return {
      initDb: initDb,
      dropDb: dropDb
    };
  }
  admin.$inject = ['$http', 'authentication'];
  
  /* global angular */
  angular
    .module('tutke')
    .service('admin', admin);
})();