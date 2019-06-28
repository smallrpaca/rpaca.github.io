import React, { Component } from 'react';
import './css/OpenRoom.scss';
import NavBar from '../components/NavBar';
import OpenRoomItem from '../components/OpenRoomItem';
import TopBar from '../components/TopBar';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Socket from '../components/Socket';

const OpenRoom = observer(
    class OpenRoom extends Component {
        @observable socket = Socket('/');

        componentDidMount(){
            this.socket.emit('openStart', '안녕');
            console.log('컴포넌트 디드 마운트 오픈 룸');

            this.socket.on('openGetStart', (data) => {
                console.log(data);
            })
        }
        render() {
            return (
                <div className="OpenRoom">
                {/* <Adv /> */}
                <TopBar />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
                <OpenRoomItem />
    
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                 <OpenRoomItem />
                <NavBar />
            </div>
            );
        }
    }
)

export default OpenRoom;