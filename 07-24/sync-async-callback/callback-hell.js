//자바스크립트/노드 프로그래밍은 기본적으로 비동기방식으로 작동됩니다.

//노드 프로그램이 비동기 방식으로 작동되는것을 눈으로 확인해봅니다.
//setTimeout()함수는 특정 시간(초)이 지난후에 특정 로직이 실행되는 내장함수
var fnSample = function(){

    console.log("fnSample()함수가 실행됩니다...시작!!!!");

    //setTimeout()함수가 실행되면 4초후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직1 실행완료-4초걸려요.');
    },4000);


    //setTimeout()함수가 실행되면 3초후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직2 실행완료-3초걸려요.');
    },3000);


    //setTimeout()함수가 실행되면 2초후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직3 실행완료-2초걸려요.');
    },2000);


    //setTimeout()함수가 실행되면 1초후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직4 실행완료-1초걸려요.');
    },1000);

}


//위에 비동기방식으로 작동되는 fnSample()함수로직을 동기방식(순차적 프로그래밍)으로 구현해보자..
//순서기반 로직1->로직2->로직3->로직4 순서대로 함수(타이머내 내용)이 실행되어야하는 업무규칙이 있다고 가정해보야요..
//동기방식 기반으로 작동하는 함수구현
//그래서 일반적으로 동기방식을 구현하기 위해 콜백함수를 사용하면 콜백지옥이슈가 만들어져요.
//콜백지옥 이슈를 해결하기 위한 방식으로 자바스크립트에서는 promise/ async/await이라는 키워드를 제공합니다.
//가장최신의 비동기방식으로 순차적 프로그래밍 구현할수 있는 권장되는 방식은 async/await방식을 추천합니다.
//(promise는 async/await방식 바로이전에 사용하던방식)
var fnSyncSample = function(){
    console.log("fnSyncSample()함수가 실행됩니다...시작!!!!");

    //setTimeout()함수가 실행되면 4초후에 내부로직이 실행됩니다.
    setTimeout(function(){
        console.log('로직1 실행완료-4초걸려요.');

        //로직2 기능구현하기 
        setTimeout(function(){
            console.log('로직2 실행완료-3초걸려요.');

            //로직3 기능구현하기 
            setTimeout(function(){
                console.log('로직3 실행완료-2초걸려요.');

                //로직4 기능구현하기 
                setTimeout(function(){
                    console.log('로직4 실행완료-1초걸려요.');
                },1000);

            },2000);

        },3000);

    },4000);


}


//비동기방식으로 작동되는 fnSample() 함수를 실행합니다.
//fnSample();

//동기방식으로 순차적 프로그래밍을 하려면 함수로직내에서 다른 함수를 정의/실행하는 방식을 사용(콜백함수)하는데
//콜백함수를 계속사용하면 콜백지옥이 발생한다. 너무정신없어요(가독성저해/로직이 잘 안보여요..)
fnSyncSample();




