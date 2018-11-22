/* Controllers helper functions */


/**
 * Api response in JSON format.
 * @param {any} res 
 * @param {number} status 
 * @param {object} data 
 */
module.exports.respondJson = function(res, status, data) {
  if(status == 200) {
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

