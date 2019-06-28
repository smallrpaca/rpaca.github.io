import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/MeetSelect.scss';
import { inject, observer } from 'mobx-react';
import Socket from './Socket';
import { observable } from 'mobx';

const MeetSelect = inject('states')(
    observer(
        class MeetSelect extends Component {
            @observable socket = Socket('/');
        
            send = (e) => {
                const { user } = this.props.states;
        
                if(user.nickname === null) {
                    alert('Please enter a nickname.');
                    return e.preventDefault();
                } else if(user.gender === null) {
                    alert('Please enter your gender');
                    return e.preventDefault();
                } else if(user.wishgender === null){
                    alert('Please enter your wishgender');
                    return e.preventDefault();
                } else {
                    this.socket.emit('start', {
                        id: user.id,
                        nickname: user.nickname,
                        gender: user.gender,
                        wishgender: user.wishgender
                    })
                }
                console.log('전송완료! : ', user.id, user.nickname, user.gender, user.wishgender);
            }
        
            render() {
                console.log('render : 확인용');
                return (
                <div className="MeetSelect">
                    <Link to="/meet/text"       
                        className="MeetText"
                        onClick={e => this.send(e)}
                    >
                        <div>
                            Text
                        </div>
                    </Link>
                    <Link to="/meet" className="MeetVoice"
                    onClick={e => 
                        alert('comming soon!!')
                    }>
                        <div>
                            comming soon <br />
                            Voice and Video
                        </div>
                    </Link>
                </div>
                );
            }
        }
    )
)

export default MeetSelect;