import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.scss";
import opentalk from "../svg/opentalk.svg";

// 모든 페이지의 하단 고정 바
const NavBar = () => {
  return (
    <div className="NavBar">
      <ul>
        <li>
          <Link to="/meet">홈</Link>
        </li>
        <li>
          <Link to="/friend">친구목록</Link>
        </li>
        <li>
          <Link to="/MyRoom">내방</Link>
        </li>
        <li>
          <Link to="/OpenRoom">
            <img src={opentalk} width="40" alt="opentalk" />
          </Link>
        </li>
        <li>
          <Link to="/Profile">프로필</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
