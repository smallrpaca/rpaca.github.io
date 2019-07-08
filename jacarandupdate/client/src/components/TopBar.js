import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/TopBar.scss";
import back from "../svg/back.svg";
// import Login from "./sub/Login";
import setting from "../svg/세팅.svg";
import getfriend from "../svg/친구찾기.svg";
import rlue from "../svg/룰.svg";
import MeetBar from "./MeetBar";

// 모든 페이지의 상위 바 (링크 위주)
const TopBar = () => {
  const [modal, setmodal] = useState(false);
  const [meunModal, setmeunModal] = useState(false);
  return (
    <div className="TopBar">
      <ul>
        <li className="randomchat" onClick={e => window.history.back()}>
          <img src={back} alt="back" width="25" />
        </li>
        <li className="TopName">Jacarand</li>
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
            <img src={getfriend} width="25" alt="getfriend" />
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
    </div>
  );
};

export default TopBar;
