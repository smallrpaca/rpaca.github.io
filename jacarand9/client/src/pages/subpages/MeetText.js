import React, { Component } from 'react';
import ChatBorder from '../../components/ChatBorder';
import ChatBar from '../../components/ChatBar';
import ChatTopBar from '../../components/ChatTopBar';
import { inject, observer } from 'mobx-react';
import Socket from '../../components/Socket';
import { observable } from 'mobx';
import "./css/MeetText.scss";

const MeetText = inject('states')(
    observer(
        class MeetText extends Component {
            @observable socket = Socket('/');
            @observable roomName = null;
            
            componentDidMount() {
                const { socket } = this;
                const { user } = this.props.states;
                
                if( user.id === null) {
                    socket.on('connect', () => {
                        user.id = socket.id
                    });
                    alert('goback');
                } else {
                    socket.on('roomName', (data) => {
                        this.roomName = data.roomName;
                    })
                }
                console.log('componentDidMount roomName : ', this.roomName);
            }

            componentWillUnmount() {
                const { user } = this.props.states;

                this.socket.emit('RoomExit', {
                    id: user.id,
                    nickname: user.nickname,
                    gender: user.gender,
                    roomName: this.roomName
                  });
            }

            render() {
                console.log('render : MeetText');
                return(
                    <div className="MeetText">
                        <ChatTopBar />
                        <ChatBorder 
                            roomName={this.roomName}
                        />
                        <ChatBar 
                            roomName={this.roomName}
                        />
                    </div>
                );
            }
        }
    )
)

export default MeetText;