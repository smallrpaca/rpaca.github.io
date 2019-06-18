import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './css/ChatBar.css';
import Socket from './Socket';

const socket = Socket();

@inject('state')
@observer
class ChatBar extends Component {
    // 서버에 이름과 메시지 전송 --- (※3)
    send (e) {
        e.preventDefault();

        socket.emit('message', {
          name: this.props.state.user,
          message: this.props.state.message
        })
        this.props.state.setMessage(''); // 입력 양식을 비웁니다.
    }

    render() {
        const { state } = this.props;

        return (
            <div className="ChatBar">
                {/* 이름: {state.user}<br /> */}
                <form 
                    className="subBar"
                    onSubmit={e => this.send(e)}
                >
                    <input
                    className="MsgInput"
                    value={state.message}
                    onChange={e => state.setMessage(e.target.value)} 
                    placeholder="send message"
                    />
                </form>
            </div>
        );
    }
}

export default ChatBar;