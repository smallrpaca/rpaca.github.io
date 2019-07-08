import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Meet,
  Friend,
  OpenRoom,
  Rlue,
  MyRoom,
  MeetVideo
} from "../pages";
import { MeetText, MeetVoice, Profile } from "../pages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/meet/text" component={MeetText} />
          <Route path="/meet/voice" component={MeetVoice} />
          <Route path="/meet/Video" component={MeetVideo} />
          <Route path="/meet" component={Meet} />
        </Switch>
        <Route path="/friend" component={Friend} />
        <Route path="/MyRoom" component={MyRoom} />
        <Route path="/OpenRoom" component={OpenRoom} />
        <Route path="/Rlue" component={Rlue} />
        <Route exact path="/Profile" component={Profile} />
      </div>
    );
  }
}

export default App;
