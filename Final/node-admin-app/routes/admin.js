var express = require('express');
var router = express.Router();


/* 
- 관리자계정목록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: admin/list.ejs 뷰페이지 반환
*/
router.get('/list', function(req, res, next) {
    res.render('admin/list.ejs');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: admin/create.ejs 뷰페이지 반환
*/
router.get('/create', function(req, res, next) {
    res.render('admin/create.ejs');
});

/* 
- 관리자계정 신규등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: post
- 응답결과: 목록페이지 이동
*/
router.post('/create', function(req, res, next) {
    //기능구현
    res.redirect('/admin/list');
});



module.exports = router;