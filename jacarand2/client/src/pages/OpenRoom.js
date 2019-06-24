import React from 'react';
import './css/OpenRoom.css';
import NavBar from '../components/NavBar';
import OpenRoomItem from '../components/OpenRoomItem';
import TopBar from '../components/TopBar';
import Adv from '../components/Adv';

const OpenRoom = () => {
    return (
        <div className="OpenRoom">
            <Adv />
            <TopBar />
            <OpenRoomItem />
            <NavBar />
        </div>
    );
};

export default OpenRoom;