import React, { Component } from 'react';
import Socket from './Socket';
import { inject, observer } from 'mobx-react';
import './css/ChatBorder.css';
import FemaleSvg from '../svg/cat.svg';
import MaleSvg from '../svg/frog.svg';

@inject('states')
@observer
class ChatBorder extends Component {
    constructor (props) {
        super(props);
        this.state = {
          logs: [],
          // loading: false,
          socket: Socket('/')
        };
        this.myRef = null;
      }

      // 컴포넌트가 마운트됐을 때
      componentDidMount () {
        console.log('componentDidMount : ChatBorder');
        const { socket } = this.state;

        socket.on('ChatSend', (data) => {
            const logs2 = this.state.logs;
            data.key = 'key_' + (this.state.logs.length + 1);
            logs2.push(data); // 로그에 추가하기
            this.setState({logs: logs2});
        })

        socket.on('exitmsg', (data) => {
          console.log('이름 : ' + data.nickname, '메세지 : '+ data.msg);
        })
        this.scrollToMyRef();
      }

      componentDidUpdate() {
        console.log('componentDidUpdate : ChatBorder');
        this.scrollToMyRef();
      }

      // 스크롤 아래로!!
      scrollToMyRef = () => 
      document.getElementById('ChatBorder').scrollBy(0, this.myRef.offsetTop)

      render () {
        const { user } = this.props.states;

        // 로그를 사용해 HTML 요소 생성 --- (※6)
        const messages = this.state.logs.map(e => (
          e.id === user.id ? 
          (<div 
            key={e.key} 
            className="MyChatItems"
          >
            <div className="MyItem">
              <span >{e.msg}</span>
            </div>
          </div>) : (
            <div 
            key={e.key} 
            className="ChatItems"
          >
            <small className="Item2">
              {e.gender === 'Female' ? 
                <img src={FemaleSvg} alt="female"></img>
              :
                <img src={MaleSvg} alt="male"></img>
              }{e.nickname}
            </small> <br />
            <div className="Item">
              {e.msg}
            </div>
          </div>
          )
        ));

        return (
          <div 
            className="ChatBorder"
            id="ChatBorder"
          >
              <div className="ChatList">
                    {messages}

                    <div // 스크롤 아래로!!
                      ref={(ref) => this.myRef = ref}
                    ></div>
              </div>
          </div>
          );
    }
}

export default ChatBorder;