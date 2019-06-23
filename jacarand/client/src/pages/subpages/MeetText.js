import React, { Component } from 'react';
import ChatBorder from '../../components/ChatBorder';
import ChatBar from '../../components/ChatBar';
import ChatTopBar from '../../components/ChatTopBar';
import { inject, observer } from 'mobx-react';
import Socket from '../../components/Socket';

@inject('states')
@observer
class MeetText extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomName: null,
            loading: false,
            socket: Socket('/')
        }
        console.log('--- MeetText ---');
    }

    componentDidMount() {
        const { socket, roomName } = this.state;
        const { user } = this.props.states;

        if( user.id === null) {
            socket.on('connect', () => {
                user.id = socket.id
            });
            alert('goback');
        } else {
            socket.on('roomName', data => {
                this.setState({
                    roomName: data.roomName
                });
                
                console.log('roomName : ', roomName);
            })
        }
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('updata:!!!!!');
        console.log(this.state.roomName);
    }

    render() {
        console.log('render : MeetText');
        return(
            <div>
                <ChatTopBar />
                <ChatBorder />
                <ChatBar roomName={this.state.roomName} />
            </div>
        );
    }
}

export default MeetText;