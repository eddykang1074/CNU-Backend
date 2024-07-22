//base1 모듈을 참조해서 odd,even,test함수를 참조합니다.

//base1.js export module의 노출객체를 객체 비구조화할당방식으로 변수 odd,even,함수test를 참조합니다.
const {odd,even,test} = require('./base1.js');

// const {odd,even,test} = {
//     odd:odd,
//     even:even,
//     test:function(){
//      console.log("base1모듈에서 실행되는 test함수입니다.");
//}

// }

//전달되는 숫자가 홀수인지 짝수인지 체크해서 홀짝 문자열 상수를 반환합니다. 
//숫자를 던져주면 문자열로 홀수이면 홀수입니다란 문자열을 반환,,짝수이면 짝수입니다란 문자열 반환한다.
function checkOddOrEven(num){
    //나누기 연산자 / %는 00값으로 나눈 나머지값을 산출한다.
    //ex) num=10이면 3/2의 나머지값: 0 
    //if(true=0)
    //만약에 num/2로 나눈 나머지값이 0=false 아니면 1=true일텐데

    if(num%2){
        //나머지값이 1(true)인경우만 홀수이면 odd 문자열 반환 
        return odd;
    }

    //나머지값이 짞수이면 even
    return even;

}

//모듈참조시 무조건 실행됨....
console.log("base2.js에서 사용하는 base1.js의 test함수호출하기",test());


module.exports = checkOddOrEven;