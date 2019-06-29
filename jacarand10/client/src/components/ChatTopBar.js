import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/ChatTopBar.scss';
import { observer, inject } from 'mobx-react';

// MeetText 페이지 component
const ChatTopBar = inject('states')(
    observer(
        class ChatTopBar extends Component {

            // 추후 사용 할 일이 있겠지..
            // componentDidMount() {
            //     console.log('componentDidMount : ChatTopBar');
            // }

            // componentDidUpdate() {
            //     console.log('componentDidUpdate : ChatTopBar');
            // }

            render() {
                return (
                <div className="ChatTopBar">
                    <div className="roomOut">
                        {/* 뒤로 가고 싶어? ㄱㄱ */}
                        <Link to="/meet">
                            back
                        </Link>
                    </div>
                    <div className="name">
                        {/* 상대방 name 값을 설정해봅시다. */}
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
))

export default ChatTopBar;