/* GET index page */
module.exports.index = function(req, res) {
  res.render('index', { title: 'Tutke.io' });
};