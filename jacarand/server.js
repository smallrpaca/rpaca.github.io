const express = require('express');
const app = express(); // express 설정
const path = require('path'); // <== path 추가

const port = process.env.port || 8080; // 포트 설정
// 서버 실행시 포트 번호 확인
// server.listen(port, () => 
//     console.log(`Listenig on port ${port}`));

process.env.NODE_ENV = "development";

// 추가
if(process.env.NODE_ENV === "production") { // prod 모드일때
    // 정적파일을 불러오기위한 폴더 지정
    app.use(express.static(path.join(__dirname, 'client/build')));
} else if (process.env.NODE_ENV === "development") { // dev 모드일때
    console.log("Development Mode");
}

// app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", (req, res) => { // client/build/index.html 을 불러옴
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// 웹 소켓 서버를 실행
const server = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio.listen(server);

// 서버 실행시 포트 번호 확인
server.listen(port, () => 
    console.log(`Listenig on port ${port}`));

// 클라이언트가 접속했을 때의 이벤트 설정
io.on('connection', (socket) => {
    console.log('사용자 접속:', socket.client.id);

    // 메시지를 받으면..
    socket.on('message', (msg) => {
        console.log('message:', msg);
        
        // 모든 클라이언트에게 전송
        io.emit('message', msg);
    })
})


