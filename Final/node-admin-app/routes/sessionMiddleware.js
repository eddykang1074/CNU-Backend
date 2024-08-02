
//관리자 로그인 상태 체크 미들웨어 함수
exports.isLoggined = (req, res, next) => {
    if(req.session.isLogined != undefined){
        //현재 사용자 로그인 상태이면 원래 요청했던 프로세스로 넘어간다.
        next();
    }else{
        //로그인이 안된 상태이면 로그인 페이지로 무조건 이동시킨다.
        res.redirect('/login');
    }
}