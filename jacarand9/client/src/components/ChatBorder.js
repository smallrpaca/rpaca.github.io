import React, { Component } from 'react';
import Socket from './Socket';
import { inject, observer } from 'mobx-react';
import './css/ChatBorder.scss';
import FemaleSvg from '../svg/female.svg';
import MaleSvg from '../svg/male.svg';
import ManagerSvg from '../svg/Manager.svg';
import { observable, action } from 'mobx';

const ChatBorder = inject('states')(
  observer(
    class ChatBorder extends Component {
      @observable socket = Socket('/');
      @observable myRef = null;
      _isMounted = false;

      constructor (props) {
        super(props);
        this.state = {
          logs: []
        };
      }

      // 컴포넌트가 마운트됐을 때
      componentDidMount () {
        console.log('componentDidMount : ChatBorder');
        this._isMounted = true;

        console.log(this.props.roomName);
        if(this._isMounted === true){
          this.receive_ChatSend();
        }

        this.socket.on('exitmsg', (data) => {
          console.log('이름 : ' + data.nickname, '메세지 : '+ data.msg);
        })

        this.scrollToMyRef();
      }

      componentDidUpdate() {
        console.log('componentDidUpdate : ChatBorder');
        this.scrollToMyRef();
      }

      @action
      async receive_ChatSend() {
        await this.socket.on('ChatSend', (data) => {
          const logs2 = this.state.logs;
          data.key = 'key_' + (this.state.logs.length + 1);
          logs2.push(data); // 로그에 추가하기
          this.setState({logs: logs2});
        })
      }

      componentWillUnmount(){
        this._isMounted = false;
      }
      // 스크롤 아래로!!
      scrollToMyRef = () => 
      document.getElementById('ChatBorder').scrollBy(0, this.myRef.offsetTop)

      render() {
        const { user } = this.props.states;

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
              {e.gender === 'Female' ? (
                <img src={FemaleSvg} alt="female"></img>
                ) : (
                  e.gender === 'Male' ? (
                    <img src={MaleSvg} alt="male"></img>
                  ) : (
                    <img src={ManagerSvg} alt="manager"></img>
                  )
                )
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
  )
) 

export default ChatBorder;