var express = require('express');
var router = express.Router();

// http://localhost:5001/login
router.get('/login', function(req, res, next) {
  res.render('login.ejs',{layout:false});
});

// http://localhost:5001/login
router.post('/login', function(req, res, next) {
  res.redirect('/main');
});

// http://localhost:5001/login
router.get('/main', function(req, res, next) {
  res.render('main');
});


module.exports = router;
