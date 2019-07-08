import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/MeetSelect.scss";
import { inject, observer } from "mobx-react";
import Socket from "./Socket";
import { observable, action } from "mobx";

// meet 페이지 component
const MeetSelect = inject("states")(
  observer(
    class MeetSelect extends Component {
      @observable socket = Socket("/"); // 네임스페이스 정의

      @action
      send = e => {
        // Text 버튼을 눌렀을 때
        const { user } = this.props.states;

        if (user.nickname === null) {
          // 닉네임이 없다면..
          alert("Please enter a nickname.");
          return e.preventDefault();
        } else if (user.gender === null) {
          // 성별이 없다면..
          alert("Please enter your gender");
          return e.preventDefault();
        } else if (user.wishgender === null) {
          // 원하는 성별이 없다면...
          alert("Please enter your wishgender");
          return e.preventDefault();
        } else {
          // 모든 조건이 충족되면 시작
          this.socket.emit("start", {
            // 서버에 user에 관한 정보 전송
            id: user.id,
            nickname: user.nickname,
            gender: user.gender,
            wishgender: user.wishgender
          });
        }
        console.log(
          "전송완료! : ",
          user.id,
          user.nickname,
          user.gender,
          user.wishgender
        );
      };

      render() {
        console.log("render : 확인용");
        return (
          <div className="MeetSelect">
            <Link
              to="/meet/text" // TextChat으로 이동
              className="MeetText"
              onClick={e => this.send(e)} // user 값 서버에 전송
            >
              <div>
                Text <br />
                Chat
              </div>
            </Link>
            <Link
              to="/meet"
              className="MeetVoice"
              onClick={e => alert("comming soon!!")}
            >
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
);

export default observable(MeetSelect);
