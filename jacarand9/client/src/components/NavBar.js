import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.scss';
import now from '../svg/now.svg';
import opentalk from '../svg/opentalk.svg';
import { observer, inject } from 'mobx-react';
import Socket from './Socket';
import { observable } from 'mobx';

const NavBar = inject('states')(
    observer(
        class NavBar extends Component {
            @observable socket = Socket('/');

            componentDidMount(){
                console.log('NavBar componentDidMount');
                if(window.location.pathname === '/meet'){
                    setInterval(()=>{
                        this.send();
                    }, 5000)
                }
            }
        
            componentDidUpdate(){
                console.log('NavBar 업데이트');
            }
        
            send = (e) => {
                const { states } = this.props;
        
                this.socket.emit('Now', );
                this.socket.on('Now', data => {
                    if(states._timer !== data.Now){
                        states.set_timer(data.Now)
                        console.log('데이타 : ', data.Now);
                    }
                })
            }

            render() {
                console.log('NavBar render');
                const { _timer } = this.props.states;
                const PathName = window.location.pathname;

                return (
                <div className="NavBar">
                        {PathName === '/meet' ? (
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
                            PathName === '/OpenRoom' ? (
                                <ul>
                                <li className="opentalk">
                                    <img src={opentalk} alt="openroom" width="40"/> 
                                    New OpenTalk
                                </li>
                                </ul>
                            ) : (
                                false
                            )
                        )}
                </div>
                );
            }
        }
    )
) 

export default NavBar;