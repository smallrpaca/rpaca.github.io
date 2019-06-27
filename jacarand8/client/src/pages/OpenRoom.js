import React, { Component } from 'react';
import './css/OpenRoom.scss';
import NavBar from '../components/NavBar';
import OpenRoomItem from '../components/OpenRoomItem';
import TopBar from '../components/TopBar';
import { observer } from 'mobx-react';

const OpenRoom = observer(
    class OpenRoom extends Component {
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