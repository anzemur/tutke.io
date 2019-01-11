(function () {
  function user($window, $http, authentication) {
    
    /* Gets user. */
    var getUser = function (userId) {
      return $http.get('/api/users/' + userId, {
        params: {
          populate: true,
        }
      });
    }
    
    /* Deletes user. */
    var deleteUser = function (userId) {
      return $http.delete('/api/users/' + userId, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    /* Adds comment to user. */
    var addCommentToUser = function (userId, data) {
      console.log(data)
      return $http.post('/api/users/' + userId + '/comments', data, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    var editCommentToUser = function (userId, commentId, data) {
      console.log(data)
      return $http.put('/api/users/' + userId + '/comments/' + commentId, data, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    var deleteComment = function (userId, commentId) {
      return $http.delete('/api/users/' + userId + '/comments/' + commentId, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    var editUser = function(userId, data) {
      console.log(data);
      return $http.put('/api/users/' + userId, data, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    }

    return {
      getUser         : getUser,
      deleteUser      : deleteUser,
      addCommentToUser: addCommentToUser,
      editCommentToUser: editCommentToUser,
      deleteComment: deleteComment,
      editUser: editUser
    }
  }

  user.$inject = ['$window', '$http', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .service('user', user);
})();