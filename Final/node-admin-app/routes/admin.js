//admin.js 라우터의 기본주소는 
//http://localhost:5001/admin 주소로 app.js에서 설정되어 있다.
var express = require('express');
var router = express.Router();

//moment 패키지
var moment = require('moment');

//ORM DB객체 참조하기 
var db = require('../models/index.js');


/*
- 관리자 계정 목록 조회 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Get
- 응답결과: 관리자계정 목록 조회 웹페이지(뷰+Data) 반환
*/
router.get('/list', async(req, res, next)=>{

    //관리자 목록조회 조회옵션 데이터 정의 =ViewModel
    const searchOption = {
        company_code:"9",
        admin_id:"",
        use_yn_code:"9"
    }

    //Step1: 전체 관리자 계정목록 조회하기
    //findAll = Select * from admin; SQL구문으로 ORM Framework이 내부적으로
    //자동 생성해서 db서버에 전달/실행되고 그 결과물이 백엔드로 반환됩니다.
    const admins = await db.Admin.findAll(); 

    //step2: 관리자 계정목록 데이터 뷰파일 전달하기 
    res.render('admin/list.ejs',{admins,moment,searchOption});
});

/*
- 관리자 계정 목록 조회처리 웹페이지 요청과 응답처리 라우팅메소드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: Post
- 응답결과: 관리자 계정 조회옵션 결과 웹페이지(뷰+Data) 반환
*/
router.post('/list',async(req,res)=>{
    //Step1:조회 옵션정보 추출하기
    const company_code = req.body.company_code;
    const admin_id = req.body.admin_id;
    const use_yn_code = req.body.use_yn_code;

    //Step2:조회옵션으로 관리자정보 조회하기
    const admins = await db.Admin.findAll({where:{admin_id:admin_id}});

    //Step3: 조회옵션 기본값을 사용자가 입력/선택한값으로 저장해서 뷰에전달한다.
    const searchOption = {
        company_code:company_code,
        admin_id:admin_id,
        use_yn_code:use_yn_code
    }

    //Step3:조회결과데이터 뷰에전달하기
    res.render('admin/list.ejs',{admins,moment,searchOption});
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
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;
    const dept_name = req.body.dept_name;
    const admin_name = req.body.admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const use_yn_code = req.body.use_yn_code;

    //Step2: 신규 관리자 정보 DB저장 처리
    //주의/중요: db에 저장할 데이터 구조는 반드시 해당 모델의 속성명과 동일해야한다.
    //신규 데이터 등록시 모델의 속성중 NotNull(allowNull:false)인 속성값은 반드시 값을 등록해야합니다.
    const admin = {
        company_code,
        admin_id,
        admin_password,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code:use_yn_code,
        reg_date:Date.now(),
        reg_member_id:1
    };

    //db admin 테이블에 상기 신규 데이터를 등록처리하고 실제 저장된 
    //관리자 계정정보를 db서버가 반환한다. 
    //create()==> INSERT INTO admin(...)values(...) SQL구문을 ORM FX가 만들어서
    //DB서버에 전달하여 실행하고 저장결과를 다시 반환한다. 
    const registedAdmin = await db.Admin.create(admin);

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
    //관리자 계정 고유번호
    const admin_member_id = req.body.admin_member_id;

    //관리자 계정:ex) eddy
    const admin_id = req.body.admin_id;
    const admin_password = req.body.admin_password;
    const company_code = req.body.company_code;
    const dept_name = req.body.dept_name;
    const admin_name = req.body.admin_name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const use_yn_code = req.body.use_yn_code;

    //STEP2: DB 해당 관리자 계정 수정처리하기 
    const admin = {
        company_code,
        dept_name,
        admin_name,
        email,
        telephone,
        used_yn_code:use_yn_code,
        edit_date:Date.now(),
        edit_member_id:1,
    };

    //db서버에 해당 관리자계정 정보를 수정하고 실제 수정된 건수를 db서버에 반환한다.
    //update() => Update admin Set company_code =0,.... WHERE admin_member_id=1;
    const updatedCnt = await db.Admin.update(admin,{
        where:{admin_member_id:admin_member_id}
    });


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

    //step1: 관리자 고유번호를 추출한다.
    const admin_member_id = req.query.id;

    //step2: 관리자 고유번호에 해당하는 단일 관리자 정보를 삭제처리한다.
    const deletedCnt = await db.Admin.destroy({
        where:{admin_member_id:admin_member_id}
    });

    //step3:삭제후 목록 페이지로 이동한다.
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
    const admin_member_id = req.params.id;
    
    //step2: 단일 관리자 정보를 db에서 조회해옵니다. 
    const admin = await db.Admin.findOne({
        where:{admin_member_id:admin_member_id}
    });

    //step3: 단일 관리자 정보를 뷰에 전달합니다.
    res.render('admin/modify.ejs',{admin});
});


module.exports = router;