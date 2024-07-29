//article.js 라우터 파일의 기본주소는
//app.js에서 참조시 http://localhost:3000/article 기본주소가 설정되게
//처리합니다.
var express = require('express');
var router = express.Router();


//DB프로그래밍을 위한 ORM DB객체 참조하기
var db = require('../models/index');



//게시글 전체목록조회 웹페이지 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/list
//호출방식: Get
//응답결과: 전체 게시글 목록이 포함된 웹페이지 반환
router.get('/list',async(req,res)=>{
    
    //전체 게시글 목록 조회하기
    const articles = await db.Article.findAll();

    res.render('article/list.ejs',{articles});
});

//신규 게시글 등록 웹페이지 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/create
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
});

//신규 게시글 입력정보 등록처리 요청과 응답처리 라우팅메소드
//호출주소: http://localhost:3000/article/create
router.post('/create',async(req,res)=>{

    //Step1: 신규 게시글 등록폼에서 사용자가 입력/선택한 값을 추출하자.
    const title = req.body.title;
    const contents = req.body.contents;
    const display_code = req.body.display;

    //Step2: article 테이블에 등록할 json 데이터 생성하기
    //주의/중요: 반드시 json 데이터 속성명은 article.js모델의 속성명과 일치해야한다.
    const article = {
        board_type_code:1,
        title:title,
        article_type_code:0,
        contents:contents,
        view_count:0,
        ip_address:'123.111.111.111',
        is_display_code:display_code,
        reg_date:Date.now(),
        reg_member_id:1
    };

    //Step3: 준비된 신규 게시글 데이터를 article테이블에 저장한다.
    //create()메소드는 ORM Framework의해 INSERT INTO article()values()쿼리로 변환되어
    //DB서버에 전송되어 DB서버에서 실행되고 실제 저장된 단일게시글 DATA를 DB서버에서 반환한다.
    const registedArticle = await db.Article.create(article);
    console.log("실제 DB article 테이블에 저장된 데이터확인:",registedArticle);



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

