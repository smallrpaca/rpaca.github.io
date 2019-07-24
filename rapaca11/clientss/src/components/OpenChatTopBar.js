import React from "react";
import back from "../svg/back.svg";
import './css/OpenChatTopBar.scss';

// MeetText 페이지 component
const OpenChatTopBar = () => {
  return (
    <div className="OpenChatTopBar">
      <div className="RoomOut" onClick={e => window.history.back()}>
        <img src={back} alt="back" width="25" />
      </div>
      <div className="name">Jacarand</div>
      {/* 타이틀 넣을 생각 */}
    </div>
  );
};

export default OpenChatTopBar;
