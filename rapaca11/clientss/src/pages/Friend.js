import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import "./css/Friend.scss";
import { observer } from "mobx-react";
import FriendItem from "../components/FriendItem";

// 친구목록 페이지
const Friend = observer(
  class Friend extends React.Component {
    render() {
      return (
        <div className="Friend">
          <div>
            <TopBar />
          </div>
          <div className="FriendList">
            <FriendItem />
          </div>
          <NavBar />
        </div>
      );
    }
  }
);

export default Friend;
