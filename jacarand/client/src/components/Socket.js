import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');

const Socket = () => {
    return socket;
}

export default Socket;