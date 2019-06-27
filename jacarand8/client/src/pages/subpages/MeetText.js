import React, { Component } from 'react';
import ChatBorder from '../../components/ChatBorder';
import ChatBar from '../../components/ChatBar';
import ChatTopBar from '../../components/ChatTopBar';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import Socket from '../../components/Socket';
import { observable, action, reaction } from 'mobx';

const MeetText = inject('states')(
    observer(
        class MeetText extends Component {
            @observable socket = Socket('/');
            @observable roomName = null;
            
            @action
            async componentDidMount() {
                const { socket } = this;
                const { user } = this.props.states;
                
                if( user.id === null) {
                    socket.on('connect', () => {
                        user.id = socket.id
                    });
                    alert('goback');
                } else {
                    await socket.on('roomName', (data) => {
                        this.roomName = data.roomName
                    })
                }
                console.log('componentDidMount roomName : ', this.roomName);
            }
        
            render() {
                const { user } = this.props.states;
                console.log('render : MeetText');
                return(
                    <div>
                        <ChatTopBar 
                            roomName={this.roomName} 
                            user={user}
                        />
                        <ChatBorder />
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