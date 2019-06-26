import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import './css/ChatBar.css';
import Socket from './Socket';
import './css/ChatBar.css';
import send2 from '../svg/send2.svg';

@inject('states')
@observer
class ChatBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: Socket('/'), // set namespace
        }
    }

    handleChange(e) {
        const { setMessage } = this.props.states;
        setMessage(e.target.value);
    }

    send (e) {
        const { socket } = this.state;
        const { user, message, setMessage } = this.props.states;

        if(message !== ''){
            socket.emit('ChatSend', {
                id: user.id,
                nickname: user.nickname,
                gender: user.gender,
                msg: message,
                roomName: this.props.roomName
            })
            setMessage('');
        } // 입력 양식을 비웁니다.
        console.log('룸 네임 : ',this.props.roomName);
        e.preventDefault();
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
                    value={states.message}
                    onChange={e => this.handleChange(e)} 
                    placeholder="send message"
                    />
                    <button
                        className="btn"
                    >
                        <img src={send2} width="40" alt="send"/>
                    </button>
                </form>
            </div>
        );
    }
}

export default ChatBar;