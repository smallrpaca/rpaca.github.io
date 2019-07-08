import React from "react";
import "./css/OpenRoomItem.scss";

// OpenRoom 한개의 목록 값 (미완성)
const OpenRoomItem = () => {
  return (
    <div className="OpenRoomItem">
      <div className="OpenRoomDesc">
        <div className="name">어서오시와요</div>
        <div className="tag">#이야기 #헤헤 #호호 #하하 #후후</div>
      </div>
      <div className="OpenRoomPer">
        <div>현재 접속자 수</div>
        <div>counter</div>
      </div>
    </div>
  );
};

export default OpenRoomItem;
