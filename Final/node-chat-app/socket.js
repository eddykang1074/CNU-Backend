//메시지 서버 소켓파일입니다.
//해당 socket.js 모듈이 메시징 서버 역할을 제공합니다.

//socket.io 팩키지 참조 
const SocketIO = require("socket.io");

//socket.js모듈 기능정의 
module.exports =(server)=>{

    //서버 소켓의 입출력(In/Out) 메시지 처리 객체 io 생성
    //input 메시지는 웹브라우저에서 들어오는 메시지
    //output 메시지는 서버소켓에서 웹브라우저로 전송하는 메시지 
    const io = SocketIO(server,{path:"/socket.io"});

    //자바스크립트에서 on(이벤트핸들러(처리기))
    //io객체에 connection 이벤트가 발생하면 콜백함수를 실행해라.
    //connection 이벤트는 웹브라우저와 서버소켓과 연결이 완료되면 발생합니다. 
    io.on("connection",(socket)=>{

        //socket은 현재 연결된 사용자(웹브라우저) 서버소켓간 연결 객체
        //웹브라우저에서 서버소켓에 broadcast라는 이벤트 수신기를 호출하면 관련 콜백함수가 실행된다.
        //socket.on("서버소켓 이벤트 수신기명",처리할콜백함수):

        //웹브라우저(클라이언트/프론트엔드)에서 서버소켓에 broadcast라는 이벤트를 호출하면
        //서버소켓에서 클라이언트에서 보내준 메시지를 수신하고 콜백함수를 통해
        //서버에서 클라이언트로 메시지를 전송(io.emit())한다.
        socket.on("broadcast",function(msg){
            //현재 메시지 서버에 연결된 모든 사용자들(웹브라우저/프론트엔드웹페이지)에게 
            //메시지를 전송하는데 클라이언트 메시지 수신 이벤트 receiveAll로 msg데이터를 전송한다.
            //io.emit()메소드는 서버소켓(io) 연결된 모든 사용자에게 메시지를 보낼때 사용..
            //io.emit('클라이언트 이벤트수신기명',클라이언트로 보낼데이터);
            io.emit("receiveAll",msg);
        });


        //지정한 채팅방 개설 및 입장처리 메시지 이벤트 수신기 
        //socket.on('서버측이벤트 수신기명',콜백함수(){});
        socket.on('entry',async(channel,nickName)=>{
            //socket.join('채팅방이름');
            //socket.join('채팅방이름')은 서버환경에 해당 채팅방이름으로
            //채널을 개설하고 현재 입장하는 사용자를 해당 채팅방 사용자로 등록처리한다.
            //이미 해당 채널이 개설되어 있으면 신규개설하지 않고 기존 채널로 입장한다.
            socket.join(channel);

            //현재 접속자를 제외한 해당 채널에 이미 접속한 모든사용자에게 메시지를 발송한다.
            //socket.to('채널명').emit();
            socket.to(channel).emit("entryOk",`${nickName}님이 ${channel} 채널에 입장했습니다.`);

            //현재 채널에 입장하고 있는 사용자에게만 메시지 발송하기 
            //socket.emit(); 현재 서버소켓을 호출한(입장하는) 사용자에게만 메시지 발송하기 
            socket.emit("entryOk",` ${nickName} 라는 대화명으로 ${channel} 채널에 입장했습니다.`);
        });


        //채팅방 기준으로 해당 채팅방의 나를 포함한 모든 사용자들에게 메시지 발송하기
        //클라이언트에서 메시지 데이터를 json포맷으로 전송한다.
        socket.on('channelMsg',async(msgData)=>{
            //클라이언트로 보낼 메시지 포맷 정의하기 
            const message = `${msgData.nickName}:${msgData.message}`;

            //io.to('채널명').emit()는 현재채널에
            //메시지를 보낸 당사자(나를) 포함한 현재 채널 모든 접속자(사용자)에게 메시지 보내기
            io.to(msgData.channel).emit('receiveChannel',message);
        });






        
    });
}



