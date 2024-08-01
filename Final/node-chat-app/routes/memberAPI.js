//일반회원 정보처리를 위한 각종 요청과 응답처리 제공 라우터 파일
//기본호출주소: http://localhost:5000/api/member 
//기본호출주소 정의는 app.js에서 정의한다.
var express = require('express');
var router = express.Router();

//ORM db객체 참조하기 
var db = require('../models/index');


/*
- 신규 회원정보 등록처리 요청과 응답 라우팅메소드
- 호출주소: http://localhost:5000/api/member/entry
- 호출방식: Post
** 중요: 클라이언트 호출하는 주소와 호출방식이 일치해야 해당 라우팅메소드가 실행됩니다.
- 응답결과: 신규 회원 정보 등록처리후 DB에 저장된 회원정보 반환
*/
router.post('/entry',async(req,res)=>{

    //백엔드 API를 호출하면 무조건 아래형식으로 데이터를 백엔드에서 반환합니다.
    let apiResult = {
        code:400, //요청상태코드: 200:정상처리 400:요청리소스가 없을때 500:서버개발자코딩에러
        data:null, //백엔드에서 프론트엔드로 전달한 데이터
        msg:"" //처리결과 코멘트(백엔드개발자가 프론트엔드 개발자에게 알려주는 코멘트메시지)
    };

    try{
        //로직 구현-로직이 에러가나면 catch블럭으로 에러내용이 자동전달됩닏.

        //Step1: 프론트엔드에서 전송해주는 회원정보(json)데이터를 추출한다.
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        //Step2: member 회원테이블에 데이터를 등록한다.
        //등록할 데이터의 구조(속성명)는 member모델의 속성명을 기준으로 작성합니다.
        //DB member 테이블에 저장할 신규 JSON 데이터를 생성합니다.(모델속성명기준-NotNull확인필요)
        const member = {
            email:email,
            member_password:password,
            name:name,
            profile_img_path:"/img/user.png",
            entry_type_code:0,
            use_state_code:1,
            entry_date:Date.now()
        };

        //위에 등록할 데이터가 db MEMBER테이블에 저장된후 실제 저장된 회원가 다시 반환된다.
        let registedMember = await db.Member.create(member);
        registedMember.member_password =""; //보안적이유로 암호는 프론트엔드에 전송안함.

        //Step3: 등록후 반환된 실제 db에 저장된 회원데이터를 프론트엔드에 반환한다.
        apiResult.code = 200;
        apiResult.data = registedMember;
        apiResult.msg = "Ok";

    }catch(err){
        console.log("/api/member/entry 호출에러발생:",err.message);

        //중요: 백엔드의 구체적인 에러내용을 프론트엔드로 전송하는것은 바로 사직서를 동일하다.(보안적위험제공)
        //왜?? DB등록처리시 먼저 DB서버를 연결하는데 DB연결실패하면 연결에러메시지를 제공하는데 이런정보내에 보안적으로 공유하면 안되는
        //정보들이 존재합니다.
        apiResult.code = 500;   
        apiResult.data = null;
        apiResult.msg = "Failed";
    }

    //프론트엔드에 최종 처리결과 데이터를 반환한다.
    res.json(apiResult);
});


module.exports = router;
