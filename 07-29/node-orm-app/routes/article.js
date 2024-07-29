//article.js 라우터 파일의 기본주소는
//app.js에서 참조시 http://localhost:3000/article 기본주소가 설정되게
//처리합니다.
var express = require('express');
var router = express.Router();

//게시글 전체목록조회 웹페이지 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/list
//호출방식: Get
//응답결과: 전체 게시글 목록이 포함된 웹페이지 반환
router.get('/list',async(req,res)=>{
    res.render('article/list.ejs');
});

//신규 게시글 등록 웹페이지 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/create
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
});

//신규 게시글 입력정보 등록처리 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/create
router.post('/create',async(req,res)=>{
   //신규게시글 db등록처리후
   //목록 페이지로 이동
   res.redirect('/article/list');
});


//기존 단일 게시글 수정처리 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/modify
router.post('/modify',async(req,res)=>{
    //기존 게시글 db수정처리후
    //목록 페이지로 이동
    res.redirect('/article/list');
 });

//기존 단일 게시글 삭제처리 요청과 응답처리 라우팅메소드 
//호출주소: http://localhost:3000/article/delete
router.get('/delete',async(req,res)=>{
    //기존 게시글 db 삭제 처리후
    //목록 페이지로 이동
    res.redirect('/article/list');
 });


//기존 단일게시글 정보 조회 확인 웹페이지 요청과 응답처리 라우팅메소드
//http://localhost:3000/article/modify/1
router.get('/modify/:id',async(req,res)=>{
    //db에서 해당 게시글 번호와 일치하는 단일게시글 정보조회 
    res.render('article/modify.ejs');
});


module.exports = router; 

