import React, { Component } from 'react';
import Socket from './Socket';
// import './css/ChatBorder.css';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx'; 

@inject('states')
@observer
class ChatBorder extends Component {
    constructor (props) {
        super(props);
        this.state = {
          logs: [],
          loading: false,
          message: null,
          socket: Socket('/')
        };
      }

      // 컴포넌트가 마운트됐을 때

      @action
      componentDidMount () {
        console.log('componentDidMount : ChatBorder');
        const { logs, loading, socket } = this.state;

        if(loading === false) {
            socket.on('loading', data => {
                this.setState({
                    loading: data.loading
                });
                console.log(data);
                console.log(data.loading);
            });
            socket.on('ChatStart', data => {
                this.setState({
                    message: data
                });
            });

            console.log(loading);

            return;

        } else if(loading === true){
            socket.on('ChatSend', (data) => {
                const logs2 = logs;
                logs2.push(data); // 로그에 추가하기
                logs2.key = 'key_' + (logs.length + 1);
                this.setState({logs: logs2});
            })
        }
      }

      @action
      componentDidUpdate() {
        console.log('componentDidUpdate : ChatBorder');
      }

      render () {
        const { user } = this.props.states;
        const { loading, message } = this.state; 

        // 로그를 사용해 HTML 요소 생성 --- (※6)
        const messages = this.state.logs.map(e => (
          e.id === user.id ? 
          (<div 
            key={e.key} 
            className="MyChatItems"
          >
            <div className="Item">
              <span>{e.nickname}</span>
              <span>{e.gender}</span>
              <span >: {e.msg}</span>
            </div>
          </div>) : (
            <div 
            key={e.key} 
            className="ChatItems"
          >
            <div className="Item">
              <span>{e.nickname}</span>
              <span>{e.gender}</span>
              <span >: {e.msg}</span>
            </div>
          </div>
          )
        ));

        return (
          <div className="ChatBorder">
              loading....
              {loading &&             
                <div className="ChatList">
                <div className="ChatItems">
                    {message}
                    {messages}
              </div>
            </div>}
          </div>
        )
    }
}

export default observable(ChatBorder);