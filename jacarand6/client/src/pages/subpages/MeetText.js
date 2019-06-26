import React, { Component } from 'react';
import ChatBorder from '../../components/ChatBorder';
import ChatBar from '../../components/ChatBar';
import ChatTopBar from '../../components/ChatTopBar';
import { inject, observer } from 'mobx-react';
import Socket from '../../components/Socket';
import { observable } from 'mobx';

@inject('states')
@observer
class MeetText extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomName: null,
            socket: Socket('/')
        }
        console.log('--- MeetText ---');
    }

    componentDidMount() {
        const { socket, roomName } = this.state;
        const { states } = this.props;

        if( states.user.id === null) {
            socket.on('connect', () => {
                states.user.id = socket.id
            });
            alert('goback');
        } else {
            socket.on('roomName', data => {
                this.setState({
                    roomName: data.roomName
                });
            })
        }
        console.log('componentDidMount roomName : ', roomName);
    }

    componentDidUpdate() {
        console.log('updata:!!!!!');
        console.log(this.state.roomName);
        // console.log(this.state.roomName);
    }

    @observable
    render() {
        const { user } = this.props.states;
        console.log('render : MeetText');
        return(
            <div>
                <ChatTopBar 
                    roomName={this.state.roomName} 
                    user={user}
                />
                <ChatBorder />
                <ChatBar 
                    roomName={this.state.roomName}
                />
            </div>
        );
    }
}

export default MeetText;