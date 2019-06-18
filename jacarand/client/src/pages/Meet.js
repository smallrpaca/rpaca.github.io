import React from 'react';
import MeetBar from '../components/MeetBar';
import MeetSelect from '../components/MeetSelect';
import NavBar from '../components/NavBar';
import './css/Meet.css';
import TopBar from '../components/TopBar';
import Adv from '../components/Adv';
const Meet = () => {
    return(
        <div className="Meet">
            <div>
                <TopBar />
            </div>
            <div className="MeetDisplay">
                <MeetSelect />
                <MeetBar />
            </div>
            <Adv />
            <NavBar />
        </div>
    );
};

export default Meet;