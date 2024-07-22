//프로젝트에 설치된 노드패키지를 참조합니다.
//node.js backend에서는 require예약어를 이용해 설치된 패키지를 참조합니다.
const moment = require('moment');

//환경설정파일에서 환경변수를 가져오기위해 dotenv패키지를 참조합니다.
const env = require('dotenv');

//프로젝트 루트에 있는 .env파일에 환경변수정보를 CPU프로세스에서 접근가능하게 구성해준다. 
env.config();

//console 객체는 node framework 자체에서 제공하는 내장객체
//헷갈리지 마세요. console 객체는 웹브라우저 개발자도구 console의 로그와 다릅니다.
console.log("index.js 모듈이 시작되었습니다.");

var toDate = Date();
var toDate2 = Date.now();

//순수 자바스크립트 날짜데이터는 기본 숫자형으로 표시됩니다. 
console.log("현재 일시를 출력합니다.-순수자바스크립트1:",toDate);


console.log("현재 일시를 출력합니다.-순수자바스크립트2:",toDate2);

//moment 패키지를 통해 숫자 타입 날짜 데이터 포맷을 변경합니다.
var formatedDate = moment(toDate2).format('YYYY-MM-DD HH:mm:ss');

//대부분의 자바스크립트 오류는 오탈자입니다.
//초기 자바스크립트 언어개발시 문제가 있다면 오탈자/대소문자 문제입니다.
//자바스크립트는 대소문자를 가려요..

console.log("formatedDate:",formatedDate);


//환경변수중에 DB주소와 사용자 정보를 조회합니다.
console.log("DB HOST IP:",process.env.DB_HOST_IP);
console.log("DB USER ID:",process.env.DB_USER_ID);
