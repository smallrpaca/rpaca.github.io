import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ChatTopBar.scss';
import { observer } from 'mobx-react';

const ChatTopBar = observer(
    class ChatTopBar extends Component {
        render() {
            return (
            <div className="ChatTopBar">
                <div className="roomOut">
                    <Link to="/meet">
                        back
                    </Link>
                </div>
                <div className="name">
                    Jacarand
                </div>
                {/* <div 
                    className="menu"
                    onClick={onoff.setTopBtn}
                >
                    menu */}
                    {/* 
                        대화기록은 meet 페이지에서 발생
                        대화상대는 myroom, openroom에서 발생
                    */}
                    {/* <div className="people">
                        대화 상대
                    </div>
                    <div>
                        방 나가기
                    </div> */}
                {/* </div>
                { onoff.topBtnValue && 
                    <div className="history">
                    <div className="title">
                        <small onClick={onoff.setTopBtn}>
                            exit
                        </small>
                        <h3>history</h3>
                    </div>      
                    <div className="desc">
                        <HistoryItem />
                    </div>
                    <div className="other">
                        Hi! My Friend!
                    </div>
                    </div>
                } */}
            </div>
            );
        }
    }
)

export default ChatTopBar;