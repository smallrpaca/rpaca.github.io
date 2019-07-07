import React, { Component } from 'react';
import Socket from './Socket';
import { inject, observer } from 'mobx-react';
import './css/ChatBorder.scss';
import FemaleSvg from '../svg/female.svg';
import MaleSvg from '../svg/male.svg';
import ManagerSvg from '../svg/Manager.svg';
import { observable, action, flow } from 'mobx';

// MeetText 페이지 Component
const ChatBorder = inject('states')(
  observer(
    class ChatBorder extends Component {
      @observable socket = Socket('/'); // 네임스페이스 정의
      @observable myRef = null; // DOM을 직접 조작해서 스크롤 이동하려고 사용함.
      @observable _isMounted = false; // 비동기 적용된 것을 다른페이지에서 작동 안하도록 하기 위해서..
      messages = null; // 메세지값 활용 map핑 하는것은.. 감시하면 난리남..

      constructor (props) {
        super(props);
        this.state = {
          logs: [], // 메세지 누적..
        };
      }

      // 컴포넌트가 마운트됐을 때
      componentDidMount () {
        console.log('componentDidMount : ChatBorder');
        this._isMounted = true; // 마운트 되었다!

        console.log(this.props.roomName);
        if(this._isMounted === true){
          this.receive_ChatSend(); // 메세지 받기
        }

        // 메세지 초기화
        this.socket.on('set_msg', (data) => { // data 값은 [] 임..
          this.setState({ logs: data }) // 메세지 초기화
        })

        this.scrollToMyRef(); // 마운트가 되면 스크롤을 지정해둔 위치로 이동
      }

      componentDidUpdate() {
        console.log('componentDidUpdate : ChatBorder');
        this.scrollToMyRef(); // 업데이트 될때마다 스크롤 이동 (logs가 업데이트 되기때문에 메세지가 추가될때마다 동작)
      }

      @action
      receive_ChatSend = flow(function * () { // 메세지를 받아 봅시다. mobx 비동기 처리
        yield this.socket.on('ChatSend', (data) => { // 비동기로 받음. 메세지 보낼때도 비동기임. (ChatBar 확인)
          const logs2 = this.state.logs;
          logs2.push(data); // 로그에 추가하기
          this.setState({logs: logs2}); // logs에 추가
        })
      })

      reStart(e) {
        const { user } = this.props.states;

        this.setState({logs: []}); // logs 초기화
      
        this.socket.emit('RoomExit', { // 룸에서 나갔다는것을 서버 요청
          nickname: user.nickname,
          roomName: this.props.roomName
        })

        // socket 도 스토어에 넣을까??.. 중복이 생각보다 많다..
        this.socket.emit('start', { // 시작하기 위해 서버 요청 (MeetSelect에 있는 내용과 동일)
            id: user.id,
            nickname: user.nickname,
            gender: user.gender,
            wishgender: user.wishgender
        })
      }

      // 스크롤 아래로!!
      @action
      scrollToMyRef = () => // ChatBorder 아이디값에 해당하는 곳에서...
      document.getElementById('ChatBorder').scrollBy(0, this.myRef.offsetTop) 

      componentWillUnmount(){
        this._isMounted = false;
      }

      render() {
        const { user } = this.props.states;

        if(this.state.logs !== []){ // logs가 빈 값이 아니라면..
          this.messages = this.state.logs.map((e, index) => ( // logs에 있는 내용 호출 (key 값은 index로..)
            e.id === user.id ? ( // 서버에서 받은 id와 현재 user id가 같다면.. 메세지 출력 위치 때문에..
            <div 
              key={index} 
              className="MyChatItems"
            >
              <div className="MyItem">
                <span >{e.msg}</span>
              </div>
            </div>
            ) : e.id === 'Manager' ? ( // 상대방이 나갔을때 나오는 메세지 (id값으로 차별화를 둠)
                <div
                  key={index}
                  className="ChatItems"
                >
                  <small className="Item2">
                    <img src={ManagerSvg} alt="female"></img>
                    {e.nickname}
                  </small><br />
                  <div className="Item">
                    {e.msg}
                  </div>
                  <button
                      className="RestartBtn" 
                      onClick={e => this.reStart(e)} // reStart 함수 실행
                    >
                      Meet again
                    </button>
                </div>
            ) : ( // 그외 id값이라면.. 상대방 또는 다른 메세지값들(시작 알림)
            <div 
              key={index} 
              className="ChatItems"
            >
              <small className="Item2">
                {e.gender === 'Female' ? ( // 여자라면?
                  <img src={FemaleSvg} alt="female"></img>
                  ) : (
                    e.gender === 'Male' ? ( // 남자라면?
                      <img src={MaleSvg} alt="male"></img>
                    ) : ( // 그외 .. 매니저
                      <img src={ManagerSvg} alt="manager"></img>
                    )
                  )
                }{e.nickname}
              </small> <br />
              <div className="Item">
                {e.msg}
              </div>
            </div>
            )
          ));
        } else if (this.state.logs === []) { // 빈값이라면...
          this.messages = this.state.logs.map(index => (
            <div key={index}></div>
          ))
        }


        return (
          <div 
            className="ChatBorder"
            id="ChatBorder"
          >
            <div className="ChatList">
              {this.messages}
            </div>
            {/* 업데이트 될때마다 스크롤 위치 지정 */}
            <div ref={(ref) => this.myRef = ref} />
          </div>
        );
      }
    }
  )
) 

export default observable(ChatBorder);