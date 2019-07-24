import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/TopBar.scss";
import back from "../svg/back.svg";
// import Login from "./sub/Login";
import setting from "../svg/세팅.svg";
import getfriend from "../svg/친구찾기.svg";
import rlue from "../svg/룰.svg";
import MeetBar from "./setGuest";
import CreateRoom from "./sub/CreateRoom";

// 모든 페이지의 상위 바 (링크 위주)
const TopBar = () => {
  const [modal, setmodal] = useState(false);
  const [meunModal, setmeunModal] = useState(false);
  const [Roommodal, setRoommodal] = useState(false);
  const PathName = window.location.pathname;
  const style = {
    filter: "grayscale(100%)",
    color: "gray"
  };

  return (
    <div className="TopBar">
      <ul>
        <li className="randomchat" onClick={e => window.history.back()}>
          <img src={back} alt="back" width="25" />
        </li>
        {PathName === "/OpenRoom" ? (
          <li className="TopName">
            <div onClick={e => setRoommodal(!Roommodal)}>Create Room</div>
          </li>
        ) : (
          <li className="TopName">Jacarand</li>
        )}

        <li className="TopLogin" onClick={e => setmodal(!modal)}>
          <small>Guest</small>
        </li>
        <li>
          <div onClick={e => setmeunModal(!meunModal)}>
            <img src={setting} width="25" alt="setting" />
          </div>
        </li>
      </ul>
      {meunModal && (
        <ul className="TopSet">
          <li>
            <img style={style} src={getfriend} width="25" alt="getfriend" />
            <small>Search</small>
          </li>
          <li>
            <Link to="/Rlue">
              <img src={rlue} width="25" alt="rlue" />
              <small>Rule</small>
            </Link>
          </li>
        </ul>
      )}
      {modal && (
        <div>
          {/* <Login /> */}
          <MeetBar />
        </div>
      )}
      {Roommodal && <CreateRoom />}
    </div>
  );
};

export default TopBar;
