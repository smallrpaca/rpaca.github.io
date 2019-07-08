import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.scss";
import opentalk from "../svg/오픈챗.svg";
import mychat from "../svg/mychat.svg";
import friend from "../svg/친구목록.svg";
import meet from "../svg/데이트.svg";
import profile from "../svg/프로필.svg";

// 모든 페이지의 하단 고정 바
const NavBar = () => {
  return (
    <div className="NavBar">
      <ul>
        <li>
          <Link to="/meet">
            <img src={meet} width="40" alt="meet" />
          </Link>
        </li>
        <li>
          <Link to="/friend">
            <img src={friend} width="40" alt="friend" />
          </Link>
        </li>
        <li>
          <Link to="/MyRoom">
            <img src={mychat} width="40" alt="home" />
          </Link>
        </li>
        <li>
          <Link to="/OpenRoom">
            <img src={opentalk} width="40" alt="opentalk" />
          </Link>
        </li>
        <li>
          <Link to="/Profile">
            <img src={profile} width="40" alt="profile" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
