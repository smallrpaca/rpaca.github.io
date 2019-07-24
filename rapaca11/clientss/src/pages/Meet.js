import React, { useState, useEffect } from "react";
// import MeetBar from "../components/MeetBar";
import MeetSelect from "../components/MeetSelect";
import NavBar from "../components/NavBar";
import "./css/Meet.scss";
import TopBar from "../components/TopBar";
import SnsLink from "../components/SnsLink";

// Meet 페이지

const Meet = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 100);
  });
  return (
    <div className="Meet">
      {!loading && <div>Jacarand....</div>}
      {loading && (
        <div>
          <div>
            <TopBar />
          </div>
          <div className="MeetDisplay">
            <MeetSelect />
          </div>
          <SnsLink />
          <NavBar />
        </div>
      )}
    </div>
  );
};

export default Meet;
