import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
import now from '../svg/now.svg';
import opentalk from '../svg/opentalk.svg';
import { observer, inject } from 'mobx-react';
import Socket from './Socket';
import { action, observable } from 'mobx';

@inject('states')
@observer
class NavBar extends Component {
    state = {
        socket: Socket('/')
    }

    componentDidMount(){
        console.log('NavBar componentDidMount');
    }

    componentDidUpdate(){
        console.log('NavBar 업데이트');
    }

    @action
    send = (e) => {
        const { socket } = this.state;
        const { states } = this.props;

        socket.emit('Now', );
        socket.on('Now', data => {
           states.set_timer(data.Now)
            console.log('데이타 : ', data.Now);
        })

        // e.preventDefault();
    }

    @observable
    render() {
        console.log('NavBar render');
        const { _timer } = this.props.states;

        return (
        <div className="NavBar">
            <ul>
                <li 
                    className="Now"
                    onClick={e => this.send(e)}    
                >
                    <img src={now} alt="now" width="30"/>
                    {_timer}
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

export default observable(NavBar);