//express 객체 참조하기 
var express = require('express');

//각종 사용자 요청과 응답을 처리할수 있는 router객체를 express.Router()메소드를 
//통해 생성합니다.
//생성된 router객체를 통해 각종 사용자 요청과 응답을 처리합니다. 
var router = express.Router();

/* 
메인 웹페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
*/
router.get('/', function(req, res, next) {
  //서버에서 사용자 웹브라우저로 응답결과물을 반환합니다.
  //지정된 뷰파일내 웹페이지가 반환됩니다.
  //res.render('뷰파일경로',뷰파일에 전달하는 JSON데이터);
  res.render('index.ejs', { title: 'asdsada11111111' });
});


//회원가입 웹페이지 요청과 응답처리 라우팅메소드 구현하기
//router.get('호출주소체계url',콜백함수()) 
//콜백함수는 해당 라우팅메소드가 호출되면 서버에서응답처리하기 위한 함수가 자동실행. 
//호출주소: http://localhost:3000/entry
//콜백함수가 서버에서 응답 처리해야하는 기능을 구현햐는 영역
router.get('/entry',function(req,res){
  //res.render()메소드는 서버에서 지정한 뷰파일을 웹브라우저로 전달하는 메소드
  //res.render('지정한 경로포함 뷰파일명',뷰파일에 전달한데이터)
  //views폴더내에 entry.ejs파일내 html웹페이지 내용을 웹브라우저에 전달한다.
  res.render('entry.ejs');
});


//로그인 웹페이지 요청과 응답처리 라우팅메소드 구현하기
//호출주소쳬게: localhost:3000/login
router.get('/login',function(req,res){
  //서버에서 응답처리할 기능구현
  //views폴더내 login.ejs파일내 html웹페이지를 웹브라우저에 전달한다. 
  res.render('login.ejs');
});



module.exports = router;
