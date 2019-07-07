import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/TopBar.scss";
import chat from "../svg/randomchat.svg";
import Login from "./sub/Login";

// 모든 페이지의 상위 바 (링크 위주)
const TopBar = () => {
  const [modal, setmodal] = useState(false);
  const [meunModal, setmeunModal] = useState(false);
  const PathName = window.location.pathname;
  const Rluestyle = {
    color: "white",
    filter: "drop-shadow(1px 1px 1px blue)"
  };
  const Meetstyle = {
    filter: " drop-shadow(1px 1px 1px red)"
  };
  return (
    <div className="TopBar">
      <ul>
        <li className="randomchat">
          <Link to="/meet">
            {PathName === "/meet" ? (
              <img src={chat} alt="chat" width="25" style={Meetstyle} />
            ) : (
              <img src={chat} alt="chat" width="25" />
            )}
          </Link>
        </li>
        <li className="TopName">Jacarand</li>
        <li className="TopLogin" onClick={e => setmodal(!modal)}>
          Login
        </li>
        <li className="TopSet">
          {PathName === "/Rlue" ? (
            <Link to="/Rlue" style={Rluestyle}>
              Rule
            </Link>
          ) : (
            <Link to="/Rlue">Rule</Link>
          )}
        </li>
        <li>
          <div onClick={e => setmeunModal(!meunModal)}>
            {meunModal === false ? <>기타</> : <>설정</>}
          </div>
          {meunModal && (
            <ul>
              <li>라라라</li>
              <li>로로로</li>
              <li>랄라라</li>
            </ul>
          )}
        </li>
      </ul>
      {modal && (
        <div>
          <Login />
          <div className="modal" onClick={e => setmodal(!modal)}>
            안녕
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
