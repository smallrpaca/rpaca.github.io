import React, { Component } from 'react';
import './css/ChatBar.scss';
import send2 from '../svg/send2.svg';
import { observer, inject } from 'mobx-react';
import Socket from './Socket';
import { observable, action } from 'mobx';

const ChatBar = inject('states')(
    observer(
        class ChatBar extends Component {
            @observable socket = Socket('/');
        
            // 메세지 내용 변경
            handleChange(e) {
                const { setMessage } = this.props.states;
                setMessage(e.target.value);
            }
        
            // 메세지 내용을 보냄
            @action
            async send(e) {
                e.preventDefault();
                const { user, message, setMessage } = this.props.states; // store
        
                // 메세지 내용이 있다면..
                if(message !== ''){
                    // ChatSend 이벤트명으로 서버 전송
                    await this.socket.emit('ChatSend', {
                        id: user.id,
                        nickname: user.nickname,
                        gender: user.gender,
                        msg: message,
                        roomName: this.props.roomName // MeetText page에서 받아옴
                })
                    setMessage('');  // 입력 양식을 비웁니다.
                }
                // 룸 네임 확인
                console.log('룸 네임 : ',this.props.roomName);
            }
            render() {
                const { states } = this.props;

                return (
                    <div className="ChatBar">
                    {/* 메세지 입력 + 보내기 */}
                    <form 
                        className="subBar"
                        onSubmit={e => this.send(e)}
                    >
                        <input
                        className="MsgInput"
                        value={states.message || ''}
                        onChange={e => this.handleChange(e)} 
                        placeholder="send message"
                        />
                        {/* 클릭했을때 폼 실행 버튼을 추가하고 싶었음 */}
                        <button className="btn"> 
                            <img src={send2} width="40" alt="send"/>
                        </button>
                    </form>
                </div>
                );
            }
        }
    )
)

export default observable(ChatBar);