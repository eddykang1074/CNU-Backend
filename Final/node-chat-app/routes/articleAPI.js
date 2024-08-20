var express = require("express");
var router = express.Router();

//JWT 토큰 생성을 위한 jsonwebtoken 패키지 참조하기
const jwt = require("jsonwebtoken");

//ORM db객체 참조하기
var db = require("../models/index");

/*
-전체 게시글 목록 조회 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/article/list
-요청방식: GET
-응답결과: 전체 게시글 목록 데이터33
*/
router.get("/list", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const articles = await db.Article.findAll();

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
-신규 게시글 등록 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/article/create
-요청방식: POST
-응답결과: 등록된 단일 게시글 데이터
*/
router.post("/create", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    //Step0: 프론트엔드에서 전달된 JWT토큰값에서 로그인 사용자 정보 추출하기
    var token = req.headers.authorization.split("Bearer ")[1];
    console.log("게시글 등록 API Token:", token);

    //사용자 토큰정보 유효성 검사 후 정상적이면 토큰내에 사용자인증 json 데이터를 반환합니다.
    var loginMember = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    //Ste1: 프론트엔드에서 전달한 데이터 추출하기
    const title = req.body.title;
    const contents = req.body.contents;
    const display = req.body.display;
    const uploadFile = req.body.file;

    //Step2: DB article 테이블에 저장할 JSON데이터 생성하기
    //Article 모델의 속성명과 데이터 속성명을 동일하게 작성해야한다.
    const article = {
      board_type_code: 2,
      title: title,
      article_type_code: 0,
      contents: contents,
      view_count: 0,
      ip_address:
        req.headers["x-forwarded-for"] || req.connection.remoteAddress, //로컬개발환경인 경우 ::1 이렇게 ip주소가 추출됩니다.
      is_display_code: display,
      reg_date: Date.now(),
      reg_member_id: loginMember.member_id, //토큰내 사용지 인증 데이터에서 사용자고유번호추출
    };

    //Step3: db article 테이블에 신규 게시글정보 등록처리
    const registedArticle = await db.Article.create(article);

    //Step4:처리결과값 프론트엔드 반환
    apiResult.code = 200;
    apiResult.data = registedArticle;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

/*
-단일 게시글 삭제 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/article/delete?id=1
-요청방식: GET
-응답결과: 단일 게시글 삭제 결과 데이터
*/
router.get("/delete", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
  } catch (err) {}

  res.json(apiResult);
});

/*
-기존 게시글 수정 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/article/modify/1
-요청방식: POST
-응답결과: 단일 게시글 수정 결과 데이터
*/
router.post("/modify/:id", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
  } catch (err) {}

  res.json(apiResult);
});

/*
-단일 게시글 조회 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/article/1
-요청방식: GET
-응답결과: 단일 게시글 데이터 결과
*/
router.get("/:id", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const articleIdx = req.params.id;
    const article = await db.Article.findOne({
      where: { article_id: articleIdx },
    });

    apiResult.code = 200;
    apiResult.data = article;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error....";
  }

  res.json(apiResult);
});

module.exports = router;
