import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import './css/ChatBar.css';
import Socket from './Socket';
import './css/ChatBar.css';

@inject('states')
@observer
class ChatBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: Socket('/'), // set namespace
        }
    }
    send (e) {
        e.preventDefault();
        const { socket } = this.state;
        const { user, message, setMessage } = this.props.states;

        socket.emit('ChatSend', {
            id: user.id,
            nickname: user.nickname,
            gender: user.gender,
            msg: message,
            roomName: this.props.roomName
        })
        setMessage(''); // 입력 양식을 비웁니다.
        console.log('룸 네임 : ',this.props.roomName);
    }

    render() {
        const { states } = this.props;

        return (
            <div className="ChatBar">
                {/* 이름: {state.user}<br /> */}
                <form 
                    className="subBar"
                    onSubmit={e => this.send(e)}
                >
                    <input
                    className="MsgInput"
                    defaultValue={states.message}
                    onChange={e => states.setMessage(e.target.value)} 
                    placeholder="send message"
                    />
                </form>
            </div>
        );
    }
}

export default ChatBar;