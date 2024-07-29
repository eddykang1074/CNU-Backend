var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//레이아웃 노드패키지 참조하기 
var expressLayouts = require('express-ejs-layouts');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//개발자 정의 라우터 파일 참조하기-게시글정보관리  
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//모든 뷰파일에 적용되는 레이아웃 뷰파일 설정하기 
app.set('layout', 'layout.ejs'); //전체레이아웃 파일 지정하기
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true); 
app.use(expressLayouts); //노드앱에 레이아웃 기능 추가적용하기


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//articleRouter 라우터의 기본 주소체계정의하기
//http://localhost:3000/article
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
