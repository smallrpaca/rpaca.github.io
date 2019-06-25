import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/TopBar.css';
import chat from '../svg/randomchat.svg';
// import Login from '../pages/Login';

class TopBar extends Component {
    render() {
        return (
        <div className="TopBar">
            <ul>
                <Link to="/meet">
                <li className="TopName">
                    Jacarand
                </li>
                </Link>
                <li className="randomchat">
                    <Link to="/meet">
                    <img src={chat} alt="chat" width="20" />
                    <small>Random Chat</small>
                    </Link>
                </li>
                {/* <li 
                    className="TopLogin"
                    onClick={onoff.OnOff}
                >
                    Login
                </li> */}
                <Link to="/setting">
                    <li className="TopSet">
                        Rule
                    </li>
                </Link>
            </ul>
            <div>
                {/* {onoff.value && <Login />} */}
            </div>
        </div>
        );
    }
}

export default TopBar;