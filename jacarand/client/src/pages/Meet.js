import React, { Component } from 'react';
import MeetBar from '../components/MeetBar';
import MeetSelect from '../components/MeetSelect';
import NavBar from '../components/NavBar';
import './css/Meet.css';
import TopBar from '../components/TopBar';
import { observer, inject } from 'mobx-react';
import Socket from '../components/Socket';
// import Adv from '../components/Adv';

@inject('states')
@observer
class Meet extends Component {
    constructor(props){
        console.log('--- Meet 페이지 ---');
        super(props);
        this.state = {
            login: false, // 로그인 여부
            socket: Socket('/') // 소켓 네임스페이스 부여
        }
    }

    componentDidMount() { // Meet페이지 마운트 될 때 초기값 설정
        const { user, setUser } = this.props.states; // store states
        const { socket } = this.state; // socket.io-client

        // user.id 초기값 : socket.id
        socket.on('connect', () => {
            user.id = socket.id;
        });

        // user.nickname이 없을 때 user 초기값
        if(user.nickname === null){
            setUser(user.id, 'Guest', null, null, null);
        }

        // socket.room 초기화
        socket.emit('setRooms', '방 초기화 해줘');

        // user 값 확인
        console.log('componentDidMount : ', user);
    }

    componentDidUpdate() { // 업데이트 현황 확인
        const { user } = this.props.states;

        console.log('componentDidUpdata : ', user);
    }

    render() {
        const { user } = this.props.states;

        console.log('render : ', user); // render 값 확인
        return (
        <div className="Meet">
            <div>
                <TopBar />
            </div>
            <div className="MeetDisplay">
                <MeetSelect />
                <MeetBar />
            </div>
            {/* <Adv /> */}
            <NavBar />
        </div>
        );
    }
}

export default Meet;