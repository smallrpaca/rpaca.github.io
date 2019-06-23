import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/TopBar.css';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
// import Login from '../pages/Login';

@inject('states')
@observer
class TopBar extends Component {
    render() {
        const { states } = this.props;

        return (
        <div className="TopBar">
            <ul>
                <li className="TopName">
                    Hi! {states.user.nickname}
                </li>
                <li>
                    My gender : {states.user.gender}
                </li>
                {/* <li 
                    className="TopLogin"
                    onClick={onoff.OnOff}
                >
                    Login
                </li> */}
                <Link to="/setting">
                    <li className="TopSet">
                        Set
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

export default observable(TopBar);