//index.js 라우터의 용도는 전체 웹사이트의 공통기능에 대한 라우팅 기능을 제공합니다.
//기본접속주소는 http://localhost:5001 로 접근하게 app.js에서 설정되어 있어요.
var express = require('express');
var router = express.Router();

//관리자 암호를 단방향암호화(해시알고리즘) 하기위해 bcryptjs패키지 참조하기 
var bcrypt = require('bcryptjs');


//ORM DB객체를 참조합니다.
var db = require('../models/index.js');



// 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅메소드 
// http://localhost:5001/login
router.get('/login', async(req, res, next)=>{

  //아이디/암호가 일치하지 않은경우 다시 로그인뷰를 전달하고
  //로그인뷰에 결과메시지 데이터를 전달합니다.
  let resultMsg = {
    code:400,
    msg:""
  };

  res.render('login.ejs',{layout:false,resultMsg});
});



// 관리자가 입력한 아이디/암호를  추출하여 실제 로그인 프로세스를 처리하는 라우팅메소드
// http://localhost:5001/login
router.post('/login', async(req, res, next)=> {

  //아이디/암호가 일치하지 않은경우 다시 로그인뷰를 전달하고
  //로그인뷰에 결과메시지 데이터를 전달합니다.
  let resultMsg = {
    code:400,
    msg:""
  };

  //Step1: 관리자 아이디/암호를 추출한다.
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password

  //Step2: 동일한 관리자 아이디 정보를 조회합니다.
  const admin = await db.Admin.findOne({
    where:{admin_id:admin_id}
  });

  //Step3: DB저장 암호와 관리자 입력 암호를 체크합니다.
  //동일한 아이디가 존재한경우
  if(admin){

    //db저장된 암호와 관리자가 로그인화면에서 입력한 암호가 일치하는지 체크
    //bcrypt.compare('로그인화면에서 전달된 암호',db에저장된암호화된문자열)메소드는 암호가 같으면 true반환,다르면 false반환
    if(bcrypt.compare(admin_password,admin.admin_password)){
      
      //Step4: 아이디 /암호가 일치하면 메인페이지로 이동시키고
      //그렇지 않으면 처리결과 data를 login.ejs에 전달합니다.

      //Step5: 서버 세션에 저장할 로그인 사용자의 주요정보 설정하기 
      var sessionLoginData = {
        admin_member_id:admin.admin_member_id,
        company_code:admin.company_code,
        admin_id:admin.admin_id,
        admin_name:admin.admin_name,
      };

      //express-session 패키지를 설치하고 app.js에설정하면 req 객체에 session속성이 추가됩니다. 
      //req.session 속성에 loginUser 동적속성을 정의하고 값으로
      //현재 로그인한 사용자의 주요데이터를 저장합니다. 
      req.session.loginUser = sessionLoginData;

      //현재 사용자의 로그인 여부를 동적속성 isLogined를 정의하고 값으로 true를 설정함.
      req.session.isLogined = true; 

      //서버세션을 최종 저장하고 메인페이지로 이동시킵니다.
      req.session.save(function(){
        console.log('세션에 저장완료');
        res.redirect('/main');
      });


    }else{
      //암호가 일치하지 않은경우 
      resultMsg.code = 402;
      resultMsg.msg = "암호가 일치하지 않습니다."
      res.render('login.ejs',{layout:false,resultMsg});
    }

  }else{
    //동일한 아이디가 없는경우 
    resultMsg.code = 401;
    resultMsg.msg = "동일한 아이디가 존재하지 않습니다."
    res.render('login.ejs',{layout:false,resultMsg});
  }
});

//정상적으로 로그인시 보여줄 메인페이지 요청과 응답처리 라우팅메소드
// http://localhost:5001/main
router.get('/main', async(req, res, next)=> {
  res.render('main.ejs');
});


module.exports = router;
