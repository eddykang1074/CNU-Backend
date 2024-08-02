var express = require('express');
var router = express.Router();

/* 메인 페이지 요청과 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
-샘플용 프론트엔드 채팅 웹페이지 
-채팅서버와 연결된 모든사용자들간 채팅하는 웹페이지 요청과 응답처리 라우팅메소드
-요청주소: http://localhost:5000/chat
-요청방식: Get
-응답결과: 단순 채팅 웹페이지 뷰 반환
*/
router.get('/chat',async(req,res)=>{
  res.render('chat.ejs');
});


/*
-샘플용 프론트엔드 채팅 웹페이지 
-특정 채팅방에 입장한 그룹 사용자들간 채팅하는 웹페이지 요청과 응답처리 라우팅메소드
-요청주소: http://localhost:5000/groupchat
-요청방식: Get
-응답결과: 단순 그룹 채팅 웹페이지 뷰 반환
*/
router.get('/groupchat',async(req,res)=>{

  res.render('groupchat.ejs');
});







module.exports = router;
