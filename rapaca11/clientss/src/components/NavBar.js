import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.scss";
import opentalk from "../svg/오픈챗.svg";
import mychat from "../svg/mychat.svg";
import friend from "../svg/친구목록.svg";
import meet from "../svg/데이트.svg";
import profile from "../svg/프로필.svg";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import Socket from "./Socket";

// 모든 페이지의 하단 고정 바
const NavBar = inject("states")(
  observer(
    class NavBar extends Component {
      @observable socket = Socket("/");

      componentDidMount() {
        const { user, setUser } = this.props.states;

        if (user.id === null) {
          this.socket.emit("setId");
          this.socket.on("setId", data => {
            user.id = data.id;
            console.log("아이디 입력 ", user.id);
          });
        }

        if (user.nickname === null) {
          setUser(user.id, "Guest", null, null, null);
          console.log("유저 임 : ", user);
        }
      }
      render() {
        const style = {
          filter: "grayscale(100%)"
        };
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
                  <img src={friend} style={style} width="40" alt="friend" />
                </Link>
              </li>
              <li>
                <Link to="/MyRoom">
                  <img src={mychat} style={style} width="40" alt="home" />
                </Link>
              </li>
              <li>
                <Link to="/OpenRoom">
                  <img src={opentalk} width="40" alt="opentalk" />
                </Link>
              </li>
              <li>
                <Link to="/Profile">
                  <img src={profile} style={style} width="40" alt="profile" />
                </Link>
              </li>
            </ul>
          </div>
        );
      }
    }
  )
);

export default NavBar;
