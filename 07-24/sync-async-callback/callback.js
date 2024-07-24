
//콜백함수 구현 및 테스트

//아주 간단한 계산함수 만들기
// fnPlus(a,b)함수에 전달되는 a,b파라메터(매개변수)를 받아 로직(더하기)를 처리하고
// 결과값을 반환하는 함수
function fnPlus(a,b){
    let c = a+b;
    //콘솔로깅 전용함수를 호출해서 콘솔에 계산결과값을 출력한다. 
    fnLogging(c);
    return c;
}

//특정함수를 매개변수로 전달해서 해당 함수내 특정 위치에서 콜백함수가 실행되게 구현한다.
//콜백함수 개념이해하기 
//콜백함수를 이용하면 특정함수내에서 순차적 프로그래밍이 가능합니다.
//매개변수 함수를 다양한 함수로 변경해서 전달할수 있다. 
function fnPlusCallBack(a,b,func){
    let c = a+b;
    //콘솔로깅 전용함수를 호출해서 콘솔에 계산결과값을 출력한다. 
    //콜백함수 실행
    func(c);
    return c;
}

//어디선가 fnLogging()함수를 호출하면 결과값을 전달해주고
//해당 결과값을 콘솔을 통해 출력해주는 로깅함수
function fnLogging(result){
    console.log(`계산 결과값은 ${result} 입니다.`);
}

//이전함수의 계산된 결과값에 기본배송비 3000원을 추가한 로직으로 콘솔출력 
function fnLoggingDelivery(result){
    const totalPrice = result + 3000;// 기본배송비 3000원 추가 
    console.log(`계산 결과값은 기본배송비가 추가되어  ${totalPrice} 입니다.`);
}

//서로 함수들간 관계없이 각자 플레이하기
// const result = fnPlus(1,3);
// console.log("fnPlus(1,3)=",result);
// fnLogging(100);


//fnPlus()함수내에서 fnLogging()함수를 호출하여 순차적인(동기방식) 프로그래밍 가능
const result = fnPlus(100,200);


//자바스크립트 언어에서 함수는 객체로 인식합니다.
//자바스크립트 함수는 특정함수에 파라메터(매개변수)로 전달가능합니다.
//fnLogging()함수를 콜백함수로 전달 
const result1 = fnPlusCallBack(1000,2000,fnLogging);

//콜백함수를 파마메터 내에서 직접 정의전달하기
//fnPlusCallBack(1000,2000,fnLogging);와 동일한 방식 
const result0 = fnPlusCallBack(1000,2000,function(result){
    console.log(`계산 결과값은 ${result} 입니다.`);
});

//배송비가 추가되는 로직이 돌아가는 fnLoggingDelivery()함수를 콜백함수로 전달 
const result2 = fnPlusCallBack(1000,2000,fnLoggingDelivery);

//콜백함수를 구현(사용)하는 이유는 기본함수가 실행될때 기본함수내에서 
//전달된 콜백함수를 순차적(동기방식)으로 실행될수 있게 강제하기 위한 수단으로 사용됩니다.

//ex) router.get('/sample',콜백함수)
//ex) router.get('/sample',function(req,res){ ... })






