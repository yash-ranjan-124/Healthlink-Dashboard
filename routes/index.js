var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/map', function (req, res, next) {
  res.render('map', { title: 'Express' });
});
router.get('/user', function (req, res, next) {
  res.render('user', { title: 'Express' });
});
router.get('/notifications', function (req, res, next) {
  res.render('notifications', { title: 'Express' });
});
module.exports = router;
