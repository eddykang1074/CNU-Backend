//일반회원 정보처리를 위한 각종 요청과 응답처리 제공 라우터 파일
//기본호출주소: http://localhost:5000/api/member 
//기본호출주소 정의는 app.js에서 정의한다.
var express = require('express');
var router = express.Router();

//사용자 암호 단방향 암호화 적용을 위해 encryptjs 참조하기
var encrypt = require('bcryptjs');

//JWT 토큰 생성을 위한 jsonwebtoken 패키지 참조하기 
const jwt = require('jsonwebtoken');

//ORM db객체 참조하기 
var db = require('../models/index');


//파일업로드를 위한 multer객체 참조하기
var multer = require('multer');


//파일저장위치 지정
var storage  = multer.diskStorage({ 
    destination(req, file, cb) {
      cb(null, 'public/upload/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
});

//일반 업로드처리 객체 생성
var upload = multer({ storage: storage });



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

        //사용자암호를 단방향 암호화 문자열로 변환하기
        const encryptedPassword  = await encrypt.hash(password,12);

        //Step2: member 회원테이블에 데이터를 등록한다.
        //등록할 데이터의 구조(속성명)는 member모델의 속성명을 기준으로 작성합니다.
        //DB member 테이블에 저장할 신규 JSON 데이터를 생성합니다.(모델속성명기준-NotNull확인필요)
        const member = {
            email:email,
            member_password:encryptedPassword,
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


/*
- 회원 로그인 데이터 처리 요청과 응답 라우팅메소드
- 호출주소: http://localhost:5000/api/member/login
- 호출방식: Post
- 응답결과: 사용자 메일/암호를 체크하고 JWT 사용자 인증토큰값을 프론트엔드로 반환한다.
*/
router.post('/login',async(req,res)=>{

    let apiResult = {
        code:400, 
        data:null, 
        msg:""
    };

    try{

        //Step1: 프론트엔드에서 전달해주는 로그인 사용자의 메일주소/암호를 추출합니다.
        const email = req.body.email;
        const password = req.body.password;

        //Step2: 사용자 메일주소 존재여부를 체크합니다.
        const member = await db.Member.findOne({
            where:{email:email}
        });

        if(member){
            //동일 메일주소가 존재하는 경우 
            //Step3: 사용자 암호값 일치여부를 체크합니다.
            const compareResult = await encrypt.compare(password,member.member_password);
            
            if(compareResult){
                //암호가 일치하는경우
                
                //Step4: 사용자 메일주소/암호가 일치하는 경우 현재 로그인 사용자의 주요정보를 JSON데이터로 생성합니다.
                const tokenJsonData = {
                    member_id:member.member_id,
                    email:member.email,
                    name:member.name,
                    profile_img_path:member.profile_img_path
                };

                //Step5: 인증된 사용자 json데이터를 JWT토큰내에 담아 JWT 토큰문자열을 생성합니다.
                //jwt.sing('토큰에 저장할 json데이터',토큰화할때 사용하는 인증키값,옵션값(토큰유효기간설정,발급자))
                const token = await jwt.sign(tokenJsonData,process.env.JWT_AUTH_KEY,{expiresIn:'24h',issuer:"CBNU"});

                //Step6: JWT토큰 문자열을 프론트엔드로 반환합니다
                apiResult.code = 200;
                apiResult.data = token;
                apiResult.msg = "Ok";

            }else{
                //암호가 틀린경우 
                apiResult.code = 400;
                apiResult.data = null;
                apiResult.msg = "InCorrectPasword";
            }


        }else{
            //메일주소가 존재하지 않은경우 프론트엔드로 결과값 바로 반환
            apiResult.code = 400;
            apiResult.data = null;
            apiResult.msg = "NotExistEmail";
        }



    }catch(err){

    }

    res.json(apiResult);

});


/*
- 현재 로그인한 사용자의 상세 프로필 정보를 DB에서 조회하여 반환하는 라우팅메소드
- 호출주소: http://localhost:5000/api/member/profile
- 호출방식: Get
- 응답결과: 프론트엔드에서 제공한 JWT토큰값을 전달받아 해당 사용자 메일주소로 DB에서 조회한 결과값 반환
*/
router.get('/profile',async(req,res)=>{

    let apiResult = {
        code:400, 
        data:null, 
        msg:""
    };

    try{
        //Step1: 웹브라우저(헤더)에서 JWT토큰 값을 추출합니다.
        //웹브라우저에서 전달되는 토큰값 예시: "Bearer dfkdjfkdjfkjdfkjdkfjdk"
        var token = req.headers.authorization.split('Bearer ')[1];

        //Step2: JWT 토큰 문자열내에서 인증사용자 JSON 데이터를 추출합니다.
        //jwt.verify('토큰문자열',토큰생성시사용한 인증키값) 실행후 토큰내 저장된 json data를 반환함.
        var loginMemberData = await jwt.verify(token,process.env.JWT_AUTH_KEY);

        //Step3: 토큰 페이로드 영역에서 추출한 현재 로그인 사용자 고유번호를 기준으로 DB에서 단일사용자 조회
        var dbMember = await db.Member.findOne({
            where:{ member_id : loginMemberData.member_id}
        });

        dbMember.member_password = ""; //굳이 사용자 암호값을 프론트에 전달할 필요없음..보안상..

        //Step4: 단일 사용자 정보를 프론트엔드로 전달합니다.
        apiResult.code = 200;
        apiResult.data = dbMember;
        apiResult.msg = "Ok";

    }catch(err){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Server Error";
    }


    res.json(apiResult);
});



/*
- 사용자 프로필 사진 업로드 및 정보 처리 라우팅메소드
- 호출주소: http://localhost:5000/api/member/profile/upload
- 호출방식: Post
- 응답결과: 프론트엔드에서 첨부한 이미지 파일을 업로드처리하고 업로드된 정보를 반환한다.
*/
router.post('/profile/upload',upload.single('file'),async(req,res)=>{

    let apiResult = {
        code:400, 
        data:null, 
        msg:""
    };


    try{

        //Step1: 업로드된 파일 정보 추출하기 
        const uploadFile = req.file;

        //실제 서버에 업로드된 파일경로 
        const filePath = `/upload/${uploadFile.filename}`;
        const fileName = uploadFile.originalname;//서버에 업로드된 파일명(32243143422_a.png)
        const fileSize = uploadFile.size;//파일크기
        const mimeType = uploadFile.mimetype;//파일의 MIME타입

        //파일정보를 DB에 저장하기
        const file = {
            filePath,
            fileName,
            fileSize,
            mimeType
        };

        //Step2: 업로드된 파일정보 반환하기 
        apiResult.code = 200;
        apiResult.data = file;
        apiResult.msg = "Ok";

    }catch(err){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Failed";
    }


    res.json(apiResult);
});



module.exports = router;
