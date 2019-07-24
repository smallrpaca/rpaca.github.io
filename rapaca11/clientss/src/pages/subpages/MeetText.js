import React, { Component } from "react";
import ChatBorder from "../../components/ChatBorder";
import ChatBar from "../../components/ChatBar";
import ChatTopBar from "../../components/ChatTopBar";
import { inject, observer } from "mobx-react";
import Socket from "../../components/Socket";
import { observable } from "mobx";
import "./css/MeetText.scss";

// Text Chat을 할 수 있는 페이지 ( open text chat은 따로 만들어야하나?)
const MeetText = inject("states")(
  observer(
    class MeetText extends Component {
      @observable socket = Socket("/"); // 네임스페이스 정의
      @observable roomName = null; // 서버에서 받을 roomName 값 (지역 변수)

      componentDidMount() {
        const { socket } = this;
        const { user } = this.props.states;

        if (user.id === null) {
          // 홈페이지를 건너뛰고 들어올 경우를 대비... socket.id 받아둠
          socket.on("connect", () => {
            user.id = socket.id;
          });
          alert("User cannot be verified."); // 사용자를 확인 할 수 없다는 메세지 보냄
        } else {
          // meet 페이지를 통해 정상적으로 접속했다면...
          socket.on("roomName", data => {
            this.roomName = data.roomName;
            // roomName 값을 받음. ( meet 페이지에서 서버에게 요청을 한 상태임. )
            // 자세한 내용은 components => MeetSelect.js 확인
          });
        }
        console.log("componentDidMount roomName : ", this.roomName); // 마운트 된 roomName 값 확인
      }

      componentWillUnmount() {
        // 해당 pathname에서 벗어나게 되면...
        const { user } = this.props.states;

        this.socket.emit("RoomExit", {
          // 서버에게 나갔다고 요청을 보냄.
          nickname: user.nickname, // 자신 닉네임
          roomName: this.roomName // 현재 룸 값
        });
      }

      render() {
        console.log("render : MeetText");
        return (
          <div className="MeetText">
            <div>
              <ChatTopBar />
              <ChatBorder
                // 자식객체에게 룸 값 공유
                roomName={this.roomName}
              />
              <ChatBar
                // 자식객체에게 룸 값 공유
                roomName={this.roomName}
              />
            </div>
          </div>
        );
      }
    }
  )
);

export default observable(MeetText);
