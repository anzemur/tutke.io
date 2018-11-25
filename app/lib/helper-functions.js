/* Controllers helper functions */


/**
 * Api response in JSON format.
 * @param {any} res 
 * @param {number} status 
 * @param {object} data 
 */
module.exports.respondJson = function(res, status, data) {
  if(status < 300) {
    res.status(status);
    res.json(data);
  } else {
    res.status(status);
    res.json(objResponse(status, data));
  }
};

/**
 * Formats response message into obj.
 * @param {number} status 
 * @param {string} message 
 */
function objResponse(status, message) {
  return {
    status: status,
    message: message
  };
}

/**
 * Return API url.
 */
module.exports.getApiParams = () => {
  return process.env.NODE_ENV === 'production' ? 'heroku_url/api' : 'http://localhost:' + (process.env.PORT || '3000') + '/api';
};
