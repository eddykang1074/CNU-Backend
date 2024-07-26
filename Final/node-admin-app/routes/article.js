var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    res.render('article/list');
});

router.get('/create', function(req, res, next) {
    res.render('article/create');
});
  
router.post('/create', function(req, res, next) {

    const id = req.body.id;
    const pw = req.body.pw;
    const code = req.body.code;

    res.redirect('/article/list');
});

router.post('/modify', function(req, res, next) {

    const id = req.body.id;
    const pw = req.body.pw;
    const code = req.body.code;
    
    res.redirect('/article/list');
});

router.get('/delete', function(req, res, next) {
    res.redirect('/article/list');
});

router.get('/modify/:id', function(req, res, next) {
    res.render('article/modify');
});


module.exports = router;