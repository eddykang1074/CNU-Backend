//admin.js 라우터의 기본주소는 
//http://localhost:5001/admin 주소로 app.js에서 설정되어 있다.
var express = require('express');
var router = express.Router();

//ORM DB객체 참조하기 
var db = require('../models/index.js');


/*
- 관리자 계정 목록 조회 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: 관리자계정 목록 조회 웹페이지(뷰+Data) 반환
*/
router.get('/list', async(req, res, next)=>{

    //Step1: 전체 관리자 계정목록 조회하기
    //findAll = Select * from admin; SQL구문으로 ORM Framework이 내부적으로
    //자동 생성해서 db서버에 전달/실행되고 그 결과물이 백엔드로 반환됩니다.
    const admins = await db.Admin.findAll(); 

    //step2: 관리자 계정목록 데이터 뷰파일 전달하기 
    res.render('admin/list.ejs',{admins:admins});
});

/*
- 관리자 계정 목록 조회처리 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Post
- 응답결과: 관리자 계정 조회옵션 결과 웹페이지(뷰+Data) 반환
*/
router.post('/list',async(req,res)=>{
    //Step1:조회 옵션정보 추출하기

    //Step2:조회옵션으로 관리자정보 조회하기

    //Step3:조회결과데이터 뷰에전달하기
    res.render('admin/list.ejs');
});


/*
- 신규 관리자 계정 등록 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Get
- 응답결과: 신규 관리자 계정 등록 웹페이지(뷰) 반환
*/
router.get('/create', async(req, res, next)=> {
    res.render('admin/create');
});


/*
- 신규 관리자 정보 등록처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: Post
- 응답결과: 신규 관리자 계정 등록 후 목록 페이지 이동
*/
router.post('/create', async(req, res, next)=> {

    //Step1: 신규 관리자 정보 추출하기
    // const id = req.body.id;
    // const pw = req.body.pw;
    // const code = req.body.code;

    //Step2: 신규 관리자 정보 DB저장 처리

    //Step3: 목록 페이지로 이동시키기
    res.redirect('/admin/list');
});


/*
- 기존 관리자 정보 수정처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/modify
- 요청방식: Post
- 응답결과: 기존 관리자 계정 정보 수정처리 후 목록 페이지 이동
*/
router.post('/modify', async(req, res, next)=> {

    //STEP1: 사용자 수정데이터 추출하기
    // const id = req.body.id;
    // const pw = req.body.pw;
    // const code = req.body.code;

    //STEP2: DB 해당 관리자 계정 수정처리하기 


    //STEP3: 수정처리후 목록페이지로 이동처리
    res.redirect('/admin/list');
});



/*
- 기존 관리자 정보 삭제처리 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/delete?id=1
- 요청방식: Get
- 응답결과: 기존 관리자 계정 정보 삭제처리 후 목록 페이지 이동
*/
router.get('/delete', async(req, res, next)=> {
    res.redirect('/admin/list');
});


/*
- 기존 관리자 정보 확인 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/modify/1
- 요청방식: Get
- 응답결과: 기존 관리자 계정 정보가 포함된 웹 페이지(뷰) 제공
*/
router.get('/modify/:id', async(req, res, next)=> {

    //step1: URL에서 관리자 고유번호를 추출합니다.

    //step2: 단일 관리자 정보를 db에서 조회해옵니다. 

    //step3: 단일 관리자 정보를 뷰에 전달합니다.
    res.render('admin/modify');
});


module.exports = router;