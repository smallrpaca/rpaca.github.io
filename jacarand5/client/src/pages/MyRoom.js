import React from 'react';
import './css/MyRoom.css';
import NavBar from '../components/NavBar';
import MyRoomItem from '../components/MyRoomItem';
import TopBar from '../components/TopBar';
import Adv from '../components/Adv';

const MyRoom = () => {
    return (
        <div className="MyRoom">
            <Adv />
            <TopBar />
            <MyRoomItem />
            <NavBar />
        </div>
    );
};

export default MyRoom;