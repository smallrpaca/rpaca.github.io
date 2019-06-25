import React from 'react';
import './css/Setting.css';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';

const Setting = () => {
    return (
        <div className="Setting">
            <TopBar />
                <div className="desc">
                    룰을 추가합시다!!
                </div>
            <NavBar />
        </div>
    );
};

export default Setting;