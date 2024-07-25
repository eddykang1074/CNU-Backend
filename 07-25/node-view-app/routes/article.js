//article.js 라우터파일은 
//게시글관련 각종 웹페이지들에 대한 요청과 응답을 처리한다.
//본 라우터파일의 기본호출주소: http://localhost:3000/article 로시작하게 
//app.js에서 라우터 파일 참조시 기본주소를 설정해준다.
var express = require('express');
var router = express.Router();


/* 
- 게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 구현
- 호출주소: http://localhost:3000/article/list
- 호출방식: Get
- 응답결과: 게시글 목록데이터를 기반으로한 게시글 목록 웹페이지 전달 
*/
router.get('/list',async(req,res)=>{

    //게시글 데이터 목록 3개 생성-추후 DB에서 데이터를 가져옵니다.
    const articles = [
        {
            article_id:"1",
            title:"게시글 제목1입니다.",
            contents:"게시글1 내용입니다.",
            display:1,
            view_cnt:10,
            ip_address:"111.111.111.111",
            regist_id:1,
            regist_date:Date.now()
        },
        {
            article_id:2,
            title:"게시글 제목2입니다.",
            contents:"게시글2 내용입니다.",
            display:0,
            view_cnt:11,
            ip_address:"222.111.111.111",
            regist_id:2,
            regist_date:Date.now()
        },
        {
            article_id:3,
            title:"게시글 제목3입니다.",
            contents:"게시글3 내용입니다.",
            display:1,
            view_cnt:30,
            ip_address:"211.111.111.111",
            regist_id:3,
            regist_date:Date.now()
        }
    ];



    //물리적경로: views/article/list.ejs
    res.render('article/list.ejs',{articles:articles});
});


/* 
- 신규 게시글 등록 웹페이지 요청과 응답처리 라우팅 메소드 구현
- 호출주소: http://localhost:3000/article/create
- 호출방식: Get
- 응답결과: 게시글 등록 웹페이지 뷰파일 전달
*/
router.get('/create',async(req,res)=>{
    res.render('article/create.ejs');
});



/* 
- 신규 게시글 등록 웹페이지에서 보내준 
- 사용자가 입력/선택한 신규 게시글 데이터를 등록 처리 요청과 응답처리 라우팅 메소드 구현
- 호출주소: http://localhost:3000/article/create
- 호출방식: Post
- 응답결과: 신규 게시글 DB등록 처리후 특정 페이지로 이동 또는 특정뷰파일 제공
** 라우팅 주소와 요청방식 2가지 동일해야 해당 라우팅 메소드가 호출되고 실행된다.
*/
router.post('/create',async(req,res)=>{

    //Step1: 사용자 입력한 폼태그내 입력/선택 데이터 추출하기 
    //req.body.전달된 폼태그내 HTML 입력/선택 요소의 name속성명으로 지정
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //Step2: DB 게시글 테이블에 저장할 JSON 데이터 생성하기
    //객체 속성명과 속성의 데이터값 변수/상수명이 같으면 상수/변수명은 생략가능하다.
    const article = {
        title,
        contents:contents,
        display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    };

    //Step3:DB 게시글 테이블에 상기 article 데이터 등록처리(Insert Into Table명...)
    //DB서버에서 Insert SQL구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환함
    const registedArticle = {
        article_id:1,
        title,
        contents:contents,
        display,
        ip_address:"111.111.111.111",
        view_cnt:0,
        regist_id:1,
        regist_date:Date.now()
    };

    //Step4: 등록완료 후 게시글 목록 페이지로 이동시킴
    //http://localhost:3000/article/list
    res.redirect('/article/list');
});



/*
-기존 게시글을 수정한 사용자 폼에 대한 게시글 데이터 수정처리 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:2000/article/modify
-호출방식: Post
-응답결과: 기존 게시글 정보를 수정처리하고 목록페이지로 이동시킨다.
*/
router.post('/modify',async(req,res)=>{

    //Step1: 사용자 수정데이터를 추출하고 수정할 데이터 소스를 생성합니다.
    //수정할 대상이 되는 게시글 고유번호 
    const articleIdx = req.body.article_id; //hidden태그의 name속성값

    //실제 수정할 데이터항목별 값 세팅하기
    const article = {
        title:req.body.title,
        contents:req.body.contents,
        display:req.body.display,
        modify_id:1,
        modify_date:Date.now()
    };

    //Step2: DB게시글 테이블에 특정게시글 번호를 기준으로 게시글 정보를 수정처리합니다.
    //Update article Set title='수정한제목',contents='수정한내용',display='게시여부값',modify_id=1,modify_date='2024-07-25 18:08:12' WHERE article_id=1;

    //수정이 완료되면 DB서버에서 수정처리건수가 반환된다.

    //Step3: 게시글 목록페이지로 이동처리
    res.redirect('/article/list');

});




/*
-기존 게시글 데이터 삭제처리 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/article/delete?aid=1
-호출방식: Get
-응답결과: 해당 게시글 삭제처리하고 목록페이지로 이동시킴
*/
router.get('/delete',async(req,res)=>{
    
    //req.query.키명으로 쿼리스트링방식으로 전달된 데이터 추출 
    const articleIdx = req.query.aid;

    //STEP2: 데이터 삭제처리
    
    //Step3: 사용자 브라우저 게시글 목록 이동처리 
    res.redirect('/article/list');
});




/*
-기존 등록된 게시글 데이터를 조회해서 게시글 수정 웹페이지에 데이터를 포함한 웹페이지 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:2000/article/modify/1
-호출방식: Get
-응답결과: db에서 해당 단일게시글 정보를 조회해와서 지정 뷰파일에 데이터를 전달하고 뷰파일내에서 해당 데이터를 html태그에 출력해서 최종 
-웹브라우저에 동적으로 변경된 웹페이지를 반환한다. 
*/
router.get('/modify/:idx',async(req,res)=>{

    //Step1: url주소에서 게시글 고유번호를 추출합니다.
    const articleIdx = req.params.idx;

    //Step2: DB 게시글 테이블에서 해당 게시글 고유번호에 해당하는 단일게시글 정보를 조회해옵니다.
    //조회해 왔다고 가정합니다.
    const article = {
        article_id:1,
        title:"게시글 제목1입니다.",
        contents:"게시글1 내용입니다.",
        display:1,
        view_cnt:10,
        ip_address:"111.111.111.111",
        regist_id:1,
        regist_date:Date.now()
    }

    //Step3: db에서 가져온 단일게시글 정보를 modify.ejs 뷰파일에 전달합니다. 
    res.render('article/modify.ejs',{article});
});










module.exports = router;