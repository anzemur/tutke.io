/* GET SignUp page */
module.exports.signUp = function(req, res) {
  res.render('sign-up', { title: 'SignUp' });
};