import React from "react";
import "./css/Home.scss";
import { Link } from "react-router-dom";
import MainSvg1 from "../svg/MainSvg1.svg";
import MainSvg2 from "../svg/MainSvg2.svg";
import MainSvg3 from "../svg/MainSvg3.svg";

// 홈페이지 추후 수정 필요...;
const Home = () => {
  return (
    <div className="Home">
      <div className="desc1">
        <div className="title">
          Jacarand
          <div className="sub">Free Random Chat</div>
        </div>
        <div className="mainPage">
          <div className="desc">
            <div>
              <img src={MainSvg1} width="40" alt="mainsvg1" />
              <span>Find someone you like.</span>
            </div>
            <div>
              <img src={MainSvg2} width="40" alt="mainsvg2" />
              <span>Talk to people all over the world.</span>
            </div>
            <div>
              <img src={MainSvg3} width="40" alt="mainsvg3" />
              <span>Free text, video, and voice chat!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="desc2">
        <div className="start">
          <Link to="/meet">
            <button className="btn">Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
