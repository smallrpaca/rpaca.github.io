import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/OpenRoomItem.scss";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import Socket from "./Socket";

const Item = inject("states")(
  class Item extends Component {
    @observable socket = Socket("/");

    send = () => {
      const { user, setRoomName } = this.props.states;

      this.socket.emit("InOpenChat", {
        roomName: this.props.roomName,
        nickname: user.nickname
      });

      setRoomName(this.props.roomName);
    };
    render() {
      return (
        <Link
          to={`/OpenText/${this.props.roomName}`}
          className="OpenRoomItem"
          onClick={this.send}
        >
          <div className="OpenRoomDesc">
            <div className="name">{this.props.roomName.split("_")[1]}</div>
            <div className="tag">{this.props.roomName.split("_")[2]}</div>
          </div>
          <div className="OpenRoomPer">
            <div>현재 접속자 수</div>
            <div>{this.props.roomLength}</div>
          </div>
        </Link>
      );
    }
  }
);

const OpenRoomItem = inject("states")(
  observer(
    class OpenRoomItem extends Component {
      @observable socket = Socket("/");
      @observable _isMounted = false;
      @observable intervel = null;
      state = {
        TotalRoom: []
      };

      componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
          this.socket.emit("SetOpenChatRoom");

          this.intervel = setInterval(() => {
            this.socket.emit("SetOpenChatRoom");
          }, 10000);

          this.socket.on("GetOpenChatRoom", data => {
            this.setState({ TotalRoom: data.TotalRoom });
            console.log(this.state.TotalRoom);
          });
        }
      }

      componentWillUnmount() {
        clearInterval(this.intervel);
        this._isMounted = false;
        console.log("마운트 했냐", this._isMounted);
      }

      render() {
        return (
          <div>
            {this.state.TotalRoom.map(data => (
              <Item
                key={`key_${data.roomName}`}
                roomName={data.roomName}
                roomLength={data.roomLength}
              />
            ))}
          </div>
        );
      }
    }
  )
);

export default OpenRoomItem;
