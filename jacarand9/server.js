const express = require('express');
const app = express(); // express 설정
const path = require('path'); // <== path 추가

const port = process.env.port || 8080; // 포트 설정

process.env.NODE_ENV = "development";

// 추가
if(process.env.NODE_ENV === "production") { // prod 모드일때
    // 정적파일을 불러오기위한 폴더 지정
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("/", (req, res) => { // client/build/index.html 을 불러옴
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
} else if (process.env.NODE_ENV === "development") { // dev 모드일때
    console.log("Development Mode");
}

// 웹 소켓 서버를 실행
const server = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio.listen(server);

// 서버 실행시 포트 번호 확인
server.listen(port, () => 
    console.log(`Listenig on port ${port}`));

// socket 용 user
var user = {
    id: null,
    nickname: null,
    gender: null,
    wishgender: null
};

// room name
const MMroom = 'Mroom_';
const FFroom = 'Froom_';
const FMroom = 'FMroom_';

// room Count
var MMroomNo = 1;
var FFroomNo = 1;
var FMroomNo = 1;

// room name + room Count
var MainRoom = {};

// 클라이언트가 접속했을 때의 이벤트 설정
io.on('connection', (socket) => {
    console.log('사용자 접속:', socket.client.id);
    console.log('현재 접속자 수 : ', socket.conn.server.clientsCount);

    // NavBar 현재 클라이언트 수 확인
    // 클라이언트가 요청하면 전달한다.
    socket.on('Now', () => {
        socket.emit('Now', {
            Now: socket.conn.server.clientsCount
        })
    })

    // Meet page
    // Meet 페이지에 도달하면 해당 socket.id 룸 전부 제거
    // 이게 필요한지 고민해봐야함...
    // 룸을 지정해서 따로따로 삭제할지??
    socket.on('setRooms', data => {
        console.log(data);
        
        io.sockets.adapter.delAll(socket.id); // 방 초기화
        console.log('남은 방 확인 : ', io.sockets.adapter.rooms);
    })

    // 클라이언트 정보 서버에 입력
    // Meet 페이지에서 Meet Text로 넘어갈때 보내옴.
    socket.on('start', (data) => {
        user.id = data.id // 아이디 확인
        user.nickname = data.nickname // 닉네임 확인
        user.gender = data.gender // 성별 확인
        user.wishgender = data.wishgender // 원하는 성별 확인

        // 현재 rooms 리스트 정의
        const rooms = io.sockets.adapter.rooms;

        // 방을 골라줄게요.
        switch(user.wishgender){ // 먼저 원하는 성별을 확인.
            case 'Male': // 남자를 원해?
                switch(user.gender){ // 나의 성별 확인.
                    case 'Male': // 남자 인가요?
                        // 그렇다면 해당 룸을 MainRoom에 정의
                        MainRoom = MMroom + MMroomNo;
                        JoinRoom(MainRoom); // 정해진 name으로 방을 들어가렴.

                        // 현재 들어간 방에 2명이 있다면 번호를 올려줘.
                        if(rooms[MainRoom].length === 2){
                            MMroomNo++;
                        }
                        break; // 완료되면 두번째 switch 탈출
                    // 밑에는 동일
                    case 'Female': // 여자 인가요?
                        MainRoom = FMroom + FMroomNo;
                        JoinRoom(MainRoom);
                        if(rooms[MainRoom].length === 2){
                            FMroomNo++;
                        }
                        break;
                    // default.. 굳이 필요한가?
                    default: // 성별이 없나요...;
                        console.log('성별이 없음');
                        break;
                }
                break; // 첫 번째 switch 탈출

            case 'Female': // 여자를 원해?
                switch(user.gender){
                    case 'Male': // 남자 인가요?
                        MainRoom = FMroom + FMroomNo;
                        JoinRoom(MainRoom);

                        if(rooms[MainRoom].length === 2){
                            FMroomNo++;
                        }
                        break;
                    case 'Female': // 여자 인가요?
                        MainRoom = FFroom + FFroomNo;
                        JoinRoom(MainRoom);
                        if(rooms[MainRoom].length === 2){
                            FFroomNo++;
                        }
                        break;
                    // default.. 굳이 필요한가?
                    default: // 성별이 없나요..
                        console.log('성별이 없음');
                        break;
                }
                break;
        }
        // 선택 된 방 확인
        console.log('선택 된 방 : ', MainRoom);

        // 현재 룸 확인
        console.log(rooms);

        // MainRoom 값 탈출
        return MainRoom;
    });

    // join 하고 roomName을 클라이언트로 보냄.
    function JoinRoom (data) {
        // rooms 리스트 확인
        const rooms = io.sockets.adapter.rooms;

        // joinRoom 에 들어온 data를 넣음
        socket.join(data, () => { // 실행 함수
            if(rooms[data].length === 2){ // room에 2명이 있다면 해당 room에 메세지 전달.
                io.sockets.in(data).emit('ChatSend', {
                    nickname: 'Manager',
                    gender: 'Manager',
                    msg: 'Your opponent\'s here. Have a good time.'
                })
            } else if(rooms[data].length === 1){ // 1명이 있다면 기다려달라고 메세지 남김.
                io.sockets.in(data).emit('ChatSend', {
                    nickname: 'Manager',
                    gender: 'Manager',
                    msg: 'Please wait a moment.'
                })
            }
        });

        // roomName 데이터를 클라이언트에 보내줌
        // 여기에 있는게 맞나?
        socket.emit('roomName', {
            roomName: data
        })
        console.log('조인 룸: ', data);
    } // joinRoom 끝

    // 클라이언트에서 오는 데이터 받음
    socket.on('ChatSend', (data) => {
        const rooms = io.sockets.adapter.rooms;

        // 들어오는 데이터 값 확인해보기
        console.log('들어온 데이터 : ', data.roomName, data.id, data.nickname, data.gender, data.msg);
        
        // 해당 room에 2명이 있다면 클라이언트에게 메세지 전달.
        if(rooms[data.roomName].length === 2){
            // 해당 룸값은 서버에서 전달했었고 클라이언트에서 기억하고 있음.
            io.sockets.in(data.roomName).emit('ChatSend', {
                id: data.id,
                nickname: data.nickname,
                gender: data.gender,
                msg: data.msg
            });
        }
    });

    // 채팅방에서 back을 눌렀을 때 해당 룸에서 나오기
    // 만약 사용자가 버튼클릭이 아닌 다른 이유로 나가게 된다면??
    // socket 접속 끊김, window 뒤로가기 누름, 리로딩 상황
    // 모든 상황을 정의?? 한방에 해결하는 법은 없나?
    socket.on('RoomExit', (data) => {
        // 룸 값은 클라이언트에서 받는다.
        socket.leave(data.roomName, () => {
            // 해당 룸에 사용자가 나갔다는 메세지를 보냄.
            io.sockets.in(data.roomName).emit('ChatSend', {
                nickname:'Manager',
                gender: 'Manager',
                msg: "'" + data.nickname + "'" + ' has left.'
            })
        });

        // 나간 방을 확인해보기
        console.log('나간 방: ', data.roomName);
    })

    socket.on('openStart', (data) => {
        const rooms = io.sockets.adapter.rooms;
        var roomss = null;
        console.log('컴포티드드이ㅏㅡㅇ : ', data);

        socket.join('room 01');
        socket.join('room 02');
        socket.join('MMroom');

        for(var key in rooms) {
            if(key.indexOf('room') === 0){
                console.log('인덱스 오브 : ', key);
            }
            // console.log('인덱스 오브 : ', key.indexOf('room'));
            console.log(rooms[key].length);
            roomss += {
                roomsName: rooms[key],
                roomsLength: rooms[key].length
            }
        }

        socket.emit('openGetStart', {
            roomsName: roomss.roomsName,
            roomsLength: roomss.roomsLength
        });
    });



    // 소켓 연결이 끊어졌을 떄 발생함.
    // 여기서 해줘야 할 이벤트는??
    socket.on('disconnect', () => {
        const rooms = io.sockets.adapter.rooms;
        console.log(socket.id);
        io.sockets.emit('Now', {
            now: socket.client.conn.server.clientsCount
        })
        console.log('나간놈 : ', socket.id);
        console.log(socket.adapter.sids);
    })

})


        // //방 인원 확인하기
        // var rooms = io.sockets.adapter.rooms;
        // for(var key in rooms){
        //     console.log('key값 : ', key);
        //     if(key == ''){
        //         console.log('1번방방방ㅂ아')
        //         continue;
        //     } else if(rooms[key].length === 1){
        //         var roomKey = key.replace('/','');
        //         console.log('룸키 : ', roomKey);
        //         console.log('2번째 방 : ', rooms[key]);
        //         socketRoom[MainRoom] = roomKey;
        //         console.log('소켓 룸[]:', socketRoom[MainRoom]);
        //     }
        // }
