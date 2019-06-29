import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.scss';
import now from '../svg/now.svg';
import opentalk from '../svg/opentalk.svg';
import { observer, inject } from 'mobx-react';
import Socket from './Socket';
import { observable, action } from 'mobx';

// 모든 페이지의 하단 고정 바
const NavBar = inject('states')(
    observer(
        class NavBar extends Component {
            @observable socket = Socket('/'); // 네임스페이스 정의

            componentDidMount(){
                console.log('NavBar componentDidMount');
                if(window.location.pathname === '/meet'){ // pathname이 meet페이지 일 경우
                    setInterval(()=>{ // 5초 마다 send 요청 ( 현재 클라이언트 수 확인 )
                        this.send();
                    }, 5000)
                }
            }
            @action
            send = (e) => { // 서버로부터 현재 클라이언트 수 요청
                const { states } = this.props;
                
                // .. 변수명을 왜 타이머로 했지.. 나중에 수정하죠..
                this.socket.emit('Now', ); // 서버에게 요청
                this.socket.on('Now', data => { // 서버 응답
                    if(states._timer !== data.Now){ // 현재 값과 서버에서 받은 값이 일치하면 변경하지 않음.
                        states.set_timer(data.Now) // 서버에서 받은 값 적용
                    }
                })
            }

            render() {
                console.log('NavBar render');
                const { _timer } = this.props.states;
                const PathName = window.location.pathname;

                return (
                <div className="NavBar">
                    {PathName === '/meet' ? ( // meet 페이지라면 현재 인원수와 openroom 이동 버튼 표시
                        <ul>
                            <li 
                                className="Now"
                            >
                                <img src={now} alt="now" width="30"/>
                                    {_timer}
                            </li>
                            <Link to="/OpenRoom">
                                <li>
                                    <img src={opentalk} alt="openroom" width="40"/> 
                                    Open World
                                </li>
                            </Link>
                        </ul>
                    ) : (
                        PathName === '/OpenRoom' ? ( // openroom 이라면 새로운 방을 만들 수 있는 버튼 생성
                            <ul>
                                <li className="opentalk">
                                    <img src={opentalk} alt="openroom" width="40"/> 
                                    New OpenTalk
                                </li>
                            </ul>
                        ) : ( // 아무것도 아니라면 일단 false
                            false
                        )
                    )}
                </div>
                );
            }
        }
    )
) 

export default observable(NavBar);