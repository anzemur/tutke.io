/* GET LogIn page */
module.exports.logIn = function(req, res) {
  res.render('log-in', { title: 'LogIn' });
};