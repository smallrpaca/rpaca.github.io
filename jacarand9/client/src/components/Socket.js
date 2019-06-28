import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://192.168.0.70:8080');

const Socket = (namespace) => {

    // 소켓 네임스페이스 설정
    socket.nsp = namespace;
    console.log('Socket namespace : ', socket.nsp);
    
    // 서버에 의해 연결이 끊어졌을때 연결 재시도
    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
            socket.connect();
        }
    })

    return socket;
}

export default Socket;