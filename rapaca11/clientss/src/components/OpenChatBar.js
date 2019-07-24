import React, { Component } from "react";
import send2 from "../svg/send2.svg";
import { observer, inject } from "mobx-react";
import Socket from "./Socket";
import { observable, action, flow } from "mobx";

// MeetText 페이지 Component
const OpenChatBar = inject("states")(
  observer(
    class ChatBar extends Component {
      @observable socket = Socket("/"); // 네임스페이스 정의
      @observable _isMounted = false; // 비동기때문에..

      // 메세지 내용 변경
      @action
      handleChange(e) {
        // 흠.. 굳이? 메세지가 바뀐다는걸 명확하게 전달하기위해
        const { setMessage } = this.props.states;
        setMessage(e.target.value); // 메세지 변경 스토어에서 관리 (전역)
      }

      // 메세지 내용을 보냄
      @action
      send(e) {
        e.preventDefault(); // 이후 이벤트 중지
        const { setMessage } = this.props.states; // store
        this._isMounted = true;

        if (this._isMounted === true) {
          this.send_ChatSend();
        }

        setMessage(""); // 입력 양식을 비웁니다.
        // 룸 네임 확인
        console.log("룸 네임 : ", this.props.roomName);
      }

      @action
      send_ChatSend = flow(function*() {
        // mobx 비동기 처리
        const { user, message, roomName } = this.props.states;

        // 메세지 내용이 있다면..
        if (message !== "") {
          // ChatSend 이벤트명으로 서버 전송
          yield this.socket.emit("OpenChatSend", {
            id: user.id,
            nickname: user.nickname,
            gender: user.gender,
            msg: message,
            roomName: roomName // MeetText page에서 받아옴
          });
        }
      });

      componentWillUnmount() {
        this._isMounted = false;
      }

      render() {
        const { states } = this.props;

        return (
          <div className="ChatBar">
            {/* 메세지 입력 + 보내기 */}
            <form className="subBar" onSubmit={e => this.send(e)}>
              <input
                className="MsgInput"
                value={states.message || ""}
                onChange={e => this.handleChange(e)}
                placeholder="send message"
              />
              {/* 클릭했을때 폼 실행 버튼을 추가하고 싶었음 */}
              <button className="SendBtn">
                <img src={send2} width="40" alt="send" />
              </button>
            </form>
          </div>
        );
      }
    }
  )
);

export default OpenChatBar;
