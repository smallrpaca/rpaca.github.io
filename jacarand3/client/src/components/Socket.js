import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');

const Socket = (namespace) => {
    socket.nsp = namespace;
    console.log('Socket namespace : ', socket.nsp);
    return socket;
}

export default Socket;