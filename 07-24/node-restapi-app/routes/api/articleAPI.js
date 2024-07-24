//articleAPI.js 라우터의 기본주소는 
//app.js에서 http://localhost:3000/api/articles 로 설정해줍니다. 

var express = require('express');
var router = express.Router();

/*
-전체 게시글 목록 데이터 요청과 응답처리 라우팅메소드 
-호출주소: http://localhost:3000/api/articles/list
-호출방식: Get
-응답결과: 게시글 JSON 데이터 목록
*/
//router.get('호출주소',콜백함수());
//async(req,res)=>{} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.(콜백지옥을 회피하는방법)
router.get('/list',async(req,res)=>{

    //DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정합니다.
    //가져온 데이터가 아래와 같아요..
    const articles = [
        {
            article_id:1,
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

    //서버응답결과물로 순수 json데이터를 반환한다.
    //res.json(json데이터);
    res.json(articles);
});



module.exports = router;