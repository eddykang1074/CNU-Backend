//각종 게시글 정보관리 웹페이지 요청과 응답처리 전용 라우터파일 
//article.js 라우터 파일의 기본 주소체계는 app.js내에서 
//http://localhost:3000/article 로 정의할 예정입니다.


//express 객체를 참조합니다.
var express = require('express');

//각종 요청과 응답처리를 위한 라우터 객체 생성하기 
var router = express.Router();


//게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의 
//요청주소: http://localhost:3000/artice/list
//router.get()라우팅메소드는 클라이언트에서 get방식으로 요청해야함
//클라이언트에 get방식으로 요청하는 방법:하나:브라우저주소창에 url직접찍는경우..
//<a href="/article/list">링크태크를 사용자가 클릭한경우
//router.get('호출주소쳬계',서버응답처리전용콜백함수());
//router.post('호출주소쳬계',서버응답처리전용콜백함수());
//router.put('호출주소쳬계',서버응답처리전용콜백함수());
//router.patch('호출주소쳬계',서버응답처리전용콜백함수());
//router.delete('호출주소쳬계',서버응답처리전용콜백함수());
router.get('/list',function(req,res){
    //콜백함수(req,res,next);
    //콜백함수(req=요청=HttpRequest객체=클라이언트/웹브라우저에서 서버로 전달되는 모든정보제공객체)
    //콜백함수(res=응답=HttpResponse객체=서버에서 클라이언트/웹브라우저로 응답처리하고 그 결과를 보내는 객체)
    //콜백함수(next= 미들웨어로 콜백처리후에 진행할 흐름제어 객체)

    //res.render('특정뷰파일경로'): 특정지정뷰파일의 내용을 웹브라우저로 전달하는 메소드
    //views폴더아래 article폴더아래 list.ejs파일을 웹브라우저로 전달한다. 
    //res.render('뷰파일경로',해당지정뷰에 전달할 DATA(JSONData))
    res.render('article/list.ejs');
});


//게시글 등록 웹페이지 요청과 응답처리 라우팅메소드
//요청주소: http://localhost:3000/article/create
//클라이언트 요청방식: Get방식
//응답형식: 게시글 등록 웹페이지(뷰파일)
router.get('/create',function(req,res){
    res.render('article/create.ejs');
});

//게시글 등록페이지에서 폼방식으로 전달해준 사용자 입력 게시글정보를 추출해
//DB에 저장처리하는 라우팅메소드 구현
//요청주소: http://localhost:3000/article/create
//클라이언트 요청방식: Post 방식
//** 서버측 라우팅 메소드는 호출주소URL과 클라이언트 요청방식이 둘다 동일해야 해당 라우팅메소드가 실행됨 */
router.post('/create',function(req,res){

    //Step1:사용자 게시글 등록폼태그내 입력/선택 값 추출하기
    //사용자 입력폼내 입력/선택 html요소태그의 값을 추출하려면
    //req.body.html태그요소의 name 속성값을 이용해 추출합니다. 
    //req=HttpRequest객체=요청정보 담고 있는 클라이언트/웹브라우저에서 서버로 전달되는 모든정보를 담고있는객체
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;

    //Step2: DB에 저장한 JSON 데이터 생성하기 
    //객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명은 생략가능하다. 
    const article = {
        title, //제목
        contents,
        display:display,
        view_cnt:0,
        ipaddress:"111.111.111.111",
        regist_date:Date.now(),
        regist_id:1,
    }

    //Step3: DB에 관련 게시글 테이블에 데이터를 저장한다.
    
    
    //Step4: 사용자 웹브라우저를 게시글 목록페이지로 바로 이동시키기
    //res.redirect('이동시키고자하는 URL주소 EX) http://www.naver.com ');
    res.redirect('/article/list');

    //res.redirect('http://localhost:3000/article/list');
    //res.redirect('https://naver.com');

});


//게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅메소드
//요청주소: http://localhost:3000/article/modify
//클라이언트 요청방식: Get방식
//응답형식: 단일 게시글 정보 확인 웹페이지(뷰파일)
router.get('/modify',function(req,res){
    res.render('article/modify.ejs');
});










//반드시 라우터파일의 라우터 객체를 exports로 노출해야
//app.js에서 router내의 라우팅 규칙을 실행할수 있습니다.
//** 절대 까먹지 마세요..export */
module.exports = router;