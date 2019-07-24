import React from "react";
import OpenChatTopBar from "../../components/OpenChatTopBar";
import OpenChatBar from "../../components/OpenChatBar";
import OpenChatBorder from "../../components/OpenChatBorder";

// Open Chat을 할 수 있는 페이지
const OpenText = () => {
  return (
    <div className="OpenText">
      <OpenChatTopBar />
      <OpenChatBorder />
      <OpenChatBar />
    </div>
  );
};

export default OpenText;
