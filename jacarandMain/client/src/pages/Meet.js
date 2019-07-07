import React, { Component } from 'react';
import MeetBar from '../components/MeetBar';
import MeetSelect from '../components/MeetSelect';
import NavBar from '../components/NavBar';
import './css/Meet.scss';
import TopBar from '../components/TopBar';
import { observer, inject } from 'mobx-react';
import Socket from '../components/Socket';
import SnsLink from '../components/SnsLink';
import { observable } from 'mobx';

// Meet 페이지
const Meet = inject('states')( // 스토어에서 states 호출
    observer(
        class Meet extends Component {
            @observable socket = Socket('/'); // 네임스페이스 정의

            constructor(props){
                console.log('--- Meet 페이지 ---');
                super(props);
                this.state = {
                    login: false, // 로그인 여부 (추후 사용)
                }
            }
        
            componentDidMount() { // Meet페이지 마운트 될 때 초기값 설정
                const { user, setUser } = this.props.states; // store states
                const { socket } = this;
                
                // socket id를 저장하는 이유는 중복체크 할때 사용할 것임.
                // 사용자가 닉네임이 같아도 아이디가 다르면 구별 할 수 있기때문에
                // 추후 로그인 기능 추가 시에는 user.loginId 로 따로 이름 추가 예정
                if(user.id === null){
                    // user.id 초기값 : socket.id
                    socket.on('connect', () => {
                    user.id = socket.id;
                    });
                }
        
                // user.nickname이 없을 때 Guest로 초기값 지정 및 user에 관한 정보 초기화
                if(user.nickname === null){
                    setUser(user.id, 'Guest', null, null, null);
                }
        
                // socket.room 초기화 (필요가 있는지 생각해볼것..)
                socket.emit('setRooms', '방 초기화 해줘');
        
                // user 값 확인
                console.log('componentDidMount(Meet) : ', user);
            }
        
            render() {
                const { user } = this.props.states; // 스토어 user
        
                console.log('render : ', user); // render 값 확인
                return (
                <div className="Meet">
                    <div>
                        <TopBar />
                    </div>
                    <div className="MeetDisplay">
                        <MeetSelect />
                        <MeetBar />
                    </div>
                    <SnsLink />
                    {/* <Adv /> */}
                    <NavBar />
                </div>
                );
            }
        }
    )
)

export default Meet;