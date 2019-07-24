import React from "react";
import "./css/MyRoom.scss";
import NavBar from "../components/NavBar";
import MyRoomItem from "../components/MyRoomItem";
import TopBar from "../components/TopBar";
import { observer } from "mobx-react";

const MyRoom = observer(
  class MyRoom extends React.Component {
    render() {
      return (
        <div className="MyRoom">
          <TopBar />
          <MyRoomItem />
          <NavBar />
        </div>
      );
    }
  }
);

export default MyRoom;
