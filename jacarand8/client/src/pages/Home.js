import React, { Component } from 'react';
import './css/Home.scss';
import Socket from '../components/Socket';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';


const Home = inject('states')(
    observer(
        class Home extends Component {
            @observable socket = Socket('/');

            componentDidMount(){
                const { user } = this.props.states;
                const { socket } = this;
        
                socket.on('connect', () => {
                    user.id = socket.id;
                })
                console.log(user.id);
            }
        
            render() {
                return (
                <div className="Home">
                    <div className="title">
                        Jacarand
                        <div className="sub">Free Random Chat</div>
                    </div>
                    <div className="mainPage">
                        <div className="desc">
                            Zakara is a free random chat service. <br />
                            We're trying to create a space for communication with everyone in the world. <br />
                            We do not require your personal information within this service. <br />
                            Please keep your anonymity. <br />
        
                            To use this method, click the Start button on the current page. <br />
                            On the next page, select your nickname, gender, wish gender and press the Start button. <br />
                        </div>
                    </div>
                    <div className="start">
                    <Link to='/meet'>
                        <button className="btn">
                            Start
                        </button>
                    </Link>
                    </div>
                </div>
                );
            }
        }
    )
)

export default Home;