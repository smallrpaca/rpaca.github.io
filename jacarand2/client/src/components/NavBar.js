import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
import Socket from './Socket';
// import feelings from '../svg/cat.svg';



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: Socket('/'),
            now: 0
        }
    }
    
    componentDidMount(){
        const { socket } = this.state;

        socket.on('Now', (data) => {
            this.setState({
                now: data.now
            })
        })
    }
    render() {
        return (
        <div className="NavBar">
            <ul>
                <li className="Now">
                    Now : {this.state.now}
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
                        {/* <img src={feelings} alt="openroom" /> */}
                        openroom
                    </li>
                </Link>
            </ul>
        </div>
        );
    }
}

export default NavBar;