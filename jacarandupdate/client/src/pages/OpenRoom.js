import React, { Component } from "react";
import "./css/OpenRoom.scss";
import NavBar from "../components/NavBar";
import OpenRoomItem from "../components/OpenRoomItem";
import TopBar from "../components/TopBar";
import { observer } from "mobx-react";
import { observable, action, flow } from "mobx";
import Socket from "../components/Socket";

// 오픈 룸 페이지
const OpenRoom = observer(
  class OpenRoom extends Component {
    @observable socket = Socket("/"); // 소켓 네임스페이스 정의
    @observable _isMounted = false;
    List = null;

    constructor(props) {
      super(props);
      this.state = {
        logs: []
      };
    }

    componentDidMount() {
      this._isMounted = true;
      if (this._isMounted === true) {
        this.socket.emit("openStart", true);
        console.log("컴포넌트 디드 마운트 오픈 룸");
        this.roomList();
      }
    }

    @action
    roomList = () => {
      this.socket.on("roomList", data => {
        console.log("아아");
        let logs2 = this.state.logs;
        logs2.push(data);
        this.setState({ logs: logs2 });
        console.log(logs2);
        this.socket.logs2 = [];
      });
    };

    componentWillUnmount() {
      this._isMounted = false;
      this.setState({ logs: [] });
    }

    render() {
      this.List = this.state.logs.map((e, index) => (
        <div key={index}>{e.roomList}</div>
      ));
      return (
        <div className="OpenRoom">
          {/* <Adv /> */}
          <TopBar />
          <OpenRoomItem />
          {this.List}
          <NavBar />
        </div>
      );
    }
  }
);

export default OpenRoom;
