import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
import Socket from './Socket';
// import feelings from '../svg/cat.svg';
import now from '../svg/now.svg';
import opentalk from '../svg/opentalk.svg';
import { action }from 'mobx';



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: Socket('/'),
            now: 0
        }
    }

    @action
    async componentDidMount(){
        console.log('NavBar componentDidMount');
        const { socket } = this.state;
        
        await socket.on('Now', (data) => {
            this.setState({
                now: data.now
            });
        });
    }

    componentDidUpdate(){
        console.log('NavBar 업데이트');
    }
    render() {
        return (
        <div className="NavBar">
            <ul>
                <li className="Now">
                    <img src={now} alt="now" width="30"/>
                    {this.state.now}
                </li>
                
                {/* <Link to="/meet">
                    <li>
                        Meet
                    </li>
                </Link>
                <Link to="/friend">
                    <li>
                        Friend
                    </li>
                </Link>
                <Link to="/MyRoom">
                    <li>
                        My Room
                    </li>
                </Link> */}
                <Link to="/OpenRoom">
                    <li>
                        <img src={opentalk} alt="openroom" width="40"/> 
                        openTalk
                    </li>
                </Link>
            </ul>
        </div>
        );
    }
}

export default NavBar;