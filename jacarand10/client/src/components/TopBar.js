import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/TopBar.scss';
import chat from '../svg/randomchat.svg';
import { observer } from 'mobx-react';

// 모든 페이지의 상위 바 (링크 위주)
const TopBar = observer(
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
                    >
                        Login
                    </li> */}
                    <Link to="/Rlue">
                        <li className="TopSet">
                            Rule
                        </li>
                    </Link>
                </ul>
            </div>
            );
        }
    }
)

export default TopBar;