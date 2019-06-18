import React, { Component } from 'react';
import Socket from './Socket';
import './css/ChatBorder.css';

const socket = Socket();

class ChatBorder extends Component {
    constructor (props) {
        super(props);
        this.state = {
          logs: [],
          id: 1
        };
      }
      // 컴포넌트가 마운트됐을 때 --- (※5)
      componentDidMount () {
        // 실시간으로 로그를 받게 설정
        socket.on('message', (obj) => {
          const logs2 = this.state.logs;
          obj.key = 'key_' + (this.state.logs.length + 1);
          console.log(obj);
          logs2.unshift(obj); // 로그에 추가하기
          this.setState({logs: logs2});
        })
      }
      render () {
        // 로그를 사용해 HTML 요소 생성 --- (※6)
        const messages = this.state.logs.map(e => (
          <div 
            key={e.key} 
            className="ChatItems"
          >
            <div className="Item">
              <span>{e.name}</span>
              <span >: {e.message}</span>
            </div>
          </div>
        ));

        return (
          <div className="ChatBorder">
            <div className="ChatList">
              {messages.reverse()}
            </div>
          </div>
        )
    }
}

export default ChatBorder;