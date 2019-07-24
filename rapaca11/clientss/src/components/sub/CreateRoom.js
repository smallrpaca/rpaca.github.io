import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Socket from "../Socket";
import { observable } from "mobx";
import "./css/CreateRoom.scss";

const CreateRoom = inject("states")(
  observer(
    class CreateRoom extends Component {
      @observable socket = Socket("/");
      @observable _isMounted = false;

      constructor(props) {
        super(props);
        this.state = {
          roomTitle: null,
          roomDesc: null
        };
      }

      componentDidMount() {
        this._isMounted = true;
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      setTitle = e => {
        this.setState({ roomTitle: e.target.value });
      };

      setDesc = e => {
        this.setState({ roomDesc: e.target.value });
      };

      send = async e => {
        const { user, setRoomName } = this.props.states;
        const { roomTitle, roomDesc } = this.state;
        if (this._isMounted) {
          await this.socket.emit("openChat", {
            nickname: user.nickname,
            roomName: `OpenRoom_${roomTitle}_${roomDesc}`
          });
        }
        setRoomName(`OpenRoom_${roomTitle}_${roomDesc}`);
      };

      render() {
        const { roomTitle, roomDesc } = this.state;
        return (
          <div className="CreateRoom">
            <div className="title">
              <div>Title</div>
              <input
                type="text"
                onChange={e => this.setTitle(e)}
                placeholder="Title"
              />
            </div>
            <div className="tag">
              <div>Content</div>
              <input
                type="text"
                onChange={e => this.setDesc(e)}
                placeholder="Content"
              />
            </div>
            <div className="create">
              <Link
                onClick={e => this.send(e)}
                to={`/OpenText/OpenRoom_${roomTitle}_${roomDesc}`}
              >
                {console.log("라라 : ", roomDesc)}
                Create
              </Link>
            </div>
          </div>
        );
      }
    }
  )
);

export default CreateRoom;
