import React from "react";
import "./css/Login.scss";

// 로그인 페이지
const Login = () => {
  return (
    <div className="Login">
      <div className="main">
        <div className="close">Close</div>
        <div className="title">Sign In With</div>
        <div className="otherLogin">
          <div>Facebook</div>
          <div>Google</div>
        </div>
        <form>
          <div className="username">
            <span>Username</span>
            <input type="text" />
          </div>
          <div className="password">
            <span>Password</span>
            <input type="password" />
          </div>
          <button className="Sign">
            <span>Sign In</span>
          </button>
        </form>
        <div className="Join">
          <span>Sign up Now</span>
          <span>Password For got?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
