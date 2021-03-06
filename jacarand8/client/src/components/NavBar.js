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
                setInterval(()=>{
                    this.send();
                }, 5000)
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

                return (
                <div className="NavBar">
                    <ul>
                        <li 
                            className="Now"
                        >
                            <img src={now} alt="now" width="30"/>
                            {_timer}
                        </li>
                        {window.location.pathname === '/meet' ? (
                            <Link to="/OpenRoom">
                                <li>
                                    <img src={opentalk} alt="openroom" width="40"/> 
                                    Open World
                                </li>
                            </Link>
                        ) : (
                            window.location.pathname === '/OpenRoom' ? (
                                <li className="opentalk">
                                    <img src={opentalk} alt="openroom" width="40"/> 
                                    New OpenTalk
                                </li>
                            ) : (
                                false
                            )
                        )}
                    </ul>
                </div>
                );
            }
        }
    )
) 

export default NavBar;