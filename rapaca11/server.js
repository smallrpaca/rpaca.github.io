const express = require("express");
const app = express(); // express 설정
const path = require("path"); // <== path 추가

const port = process.env.port || 8080; // 포트 설정

process.env.NODE_ENV = "development";

// 추가
if (process.env.NODE_ENV === "production") {
  // prod 모드일때
  // 정적파일을 불러오기위한 폴더 지정
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", (req, res) => {
    // client/build/index.html 을 불러옴
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else if (process.env.NODE_ENV === "development") {
  // dev 모드일때
  console.log("Development Mode");
}

// 웹 소켓 서버를 실행
const server = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio.listen(server);

// 서버 실행시 포트 번호 확인
server.listen(port, () => console.log(`Listenig on port ${port}`));

// socket 용 user
var user = {
  id: null,
  nickname: null,
  gender: null,
  wishgender: null
};

// room name
const MMroom = "Mroom_";
const FFroom = "Froom_";
const FMroom = "FMroom_";

// room Count
var MMroomNo = 1;
var FFroomNo = 1;
var FMroomNo = 1;

// room name + room Count
var MainRoom = {};

// 클라이언트가 접속했을 때의 이벤트 설정
io.on("connection", socket => {
  console.log("사용자 접속:", socket.client.id);
  console.log("현재 접속자 수 : ", socket.conn.server.clientsCount);
  console.log("현재 개설된 방 : ", io.sockets.adapter.rooms);

  socket.on("setId", () => {
    socket.emit("setId", {
      id: socket.id
    });
  });

  // 클라이언트 정보 서버에 입력
  // Meet 페이지에서 Meet Text로 넘어갈때 보내옴.
  socket.on("start", data => {
    user.id = data.id; // 아이디 확인
    user.nickname = data.nickname; // 닉네임 확인
    user.gender = data.gender; // 성별 확인
    user.wishgender = data.wishgender; // 원하는 성별 확인

    // 현재 rooms 리스트 정의
    const rooms = io.sockets.adapter.rooms;

    // 방을 골라줄게요.
    switch (
      user.wishgender // 먼저 원하는 성별을 확인.
    ) {
      case "Male": // 남자를 원해?
        switch (
          user.gender // 나의 성별 확인.
        ) {
          case "Male": // 남자 인가요?
            // 그렇다면 해당 룸을 MainRoom에 정의
            MainRoom = MMroom + MMroomNo;
            JoinRoom(MainRoom); // 정해진 name으로 방을 들어가렴.
            // 현재 들어간 방에 2명이 있다면 번호를 올려줘.
            if (rooms[MainRoom].length === 2) {
              MMroomNo++;
            }
            break; // 완료되면 두번째 switch 탈출
          // 밑에는 동일
          case "Female": // 여자 인가요?
            MainRoom = FMroom + FMroomNo;
            JoinRoom(MainRoom);
            if (rooms[MainRoom].length === 2) {
              FMroomNo++;
            }
            break;
          // default.. 굳이 필요한가?
          default:
            // 성별이 없나요...;
            console.log("성별이 없음");
            break;
        }
        break; // 첫 번째 switch 탈출

      case "Female": // 여자를 원해?
        switch (user.gender) {
          case "Male": // 남자 인가요?
            MainRoom = FMroom + FMroomNo;
            JoinRoom(MainRoom);

            if (rooms[MainRoom].length === 2) {
              FMroomNo++;
            }
            break;
          case "Female": // 여자 인가요?
            MainRoom = FFroom + FFroomNo;
            JoinRoom(MainRoom);
            if (rooms[MainRoom].length === 2) {
              FFroomNo++;
            }
            break;
          // default.. 굳이 필요한가?
          default:
            // 성별이 없나요..
            console.log("성별이 없음");
            break;
        }
        break;
    }
    // 선택 된 방 확인
    console.log("선택 된 방 : ", MainRoom);

    // 현재 룸 확인
    console.log(rooms);

    // MainRoom 값 탈출
    return MainRoom;
  });

  // join 하고 roomName을 클라이언트로 보냄.
  function JoinRoom(RoomName) {
    // rooms 리스트 확인
    const rooms = io.sockets.adapter.rooms;

    // joinRoom 에 들어온 data를 넣음
    socket.join(RoomName, () => {
      // 실행 함수
      if (rooms[RoomName].length === 2) {
        // room에 2명이 있다면 해당 room에 메세지 전달.

        // 기존에 있던 메세지 초기화
        io.sockets.in(RoomName).emit("set_msg", []);

        // 상대가 들어왔다면 메세지 보냄
        io.sockets.in(RoomName).emit("ChatSend", {
          nickname: "Manager",
          msg: "Your opponent's here. Have a good time."
        });
      } else if (rooms[RoomName].length === 1) {
        // 1명이 있다면 기다려달라고 메세지 남김.
        io.sockets.in(RoomName).emit("ChatSend", {
          nickname: "Manager",
          msg: "Please wait a moment...."
        });
      }
    });

    // roomName 데이터를 클라이언트에 보내줌
    // 여기에 있는게 맞나?
    socket.emit("roomName", {
      roomName: RoomName
    });
    console.log("조인 룸: ", RoomName);
  } // joinRoom 끝

  // 클라이언트에서 오는 데이터 받음
  socket.on("ChatSend", data => {
    const rooms = io.sockets.adapter.rooms;

    // 들어오는 데이터 값 확인해보기
    console.log(
      "들어온 데이터 : ",
      data.roomName,
      data.id,
      data.nickname,
      data.gender,
      data.msg
    );

    // // 해당 room에 2명이 있다면 클라이언트에게 메세지 전달.
    if (rooms[data.roomName].length > 1) {
      // 해당 룸값은 서버에서 전달했었고 클라이언트에서 기억하고 있음.
      io.sockets.in(data.roomName).emit("ChatSend", {
        id: data.id,
        nickname: data.nickname,
        gender: data.gender,
        msg: data.msg
      });
    }
  });

  // 채팅방에서 back을 눌렀을 때 해당 룸에서 나오기
  // 만약 사용자가 버튼클릭이 아닌 다른 이유로 나가게 된다면??
  // socket 접속 끊김, window 뒤로가기 누름, 리로딩 상황
  // 모든 상황을 정의?? 한방에 해결하는 법은 없나?
  socket.on("RoomExit", data => {
    // 룸 값은 클라이언트에서 받는다.
    socket.leave(data.roomName, () => {
      // 해당 룸에 사용자가 나갔다는 메세지를 보냄.
      io.sockets.in(data.roomName).emit("ChatSend", {
        id: "Manager",
        nickname: "Manager",
        msg: "'" + data.nickname + "'" + " has left."
      });
    });

    // 나간 방을 확인해보기
    console.log("나간 방: ", data.roomName);
  });
  // 랜덤 텍스트 채팅 끝

  // 여기서부터 오픈 챗방
  // OpenChat을 들어왔을 때
  socket.on("openChat", data => {
    console.log(data);
    // joinRoom 에 들어온 data를 넣음
    socket.join(data.roomName, () => {
      // 실행 함수
      io.sockets.in(data.roomName).emit("OpenChatSend", {
        nickname: "Manager",
        msg: "Welcome " + data.nickname
      });
    });
  });

  socket.on("InOpenChat", data => {
    console.log(data);
    socket.join(data.roomName, () => {
      io.sockets.in(data.roomName).emit("OpenChatSend", {
        nickname: "Manager",
        msg: "Welcome " + data.nickname
      });
    });
  });

  socket.on("SetOpenChatRoom", () => {
    const rooms = io.sockets.adapter.rooms;
    const TotalRoom = [];
    const TotalRooms = [];
    for (var key in rooms) {
      console.log("key값 : ", key);
      TotalRoom.push({
        roomName: key,
        roomLength: rooms[key].length
      });
    }

    for (var i = 0; i < TotalRoom.length; i++) {
      var RoomCheck = TotalRoom[i].roomName.indexOf("OpenRoom_");
      console.log("TotalRoom : ", TotalRoom[i].roomName.indexOf("OpenRoom_"));
      if (RoomCheck === 0) {
        console.log(TotalRoom[i].roomLength);
        if (TotalRoom[i].roomLength > 0) {
          TotalRooms.push(TotalRoom[i]);
          socket.emit("GetOpenChatRoom", {
            TotalRoom: TotalRooms
          });
        }
      }
    }
  });

  // 클라이언트에서 오는 데이터 받음
  socket.on("OpenChatSend", data => {
    // 들어오는 데이터 값 확인해보기
    console.log(
      "들어온 데이터 : OpenChat",
      data.roomName,
      data.id,
      data.nickname,
      data.gender,
      data.msg
    );

    // 해당 룸값은 클라이언트 측에서 지니고있음.
    io.sockets.in(data.roomName).emit("OpenChatSend", {
      id: data.id,
      nickname: data.nickname,
      gender: data.gender,
      msg: data.msg
    });
  });

  socket.on("OpenRoomExit", data => {
    // 룸 값은 클라이언트에서 받는다.
    const rooms = io.sockets.adapter.rooms;
    console.log(rooms);
    socket.leave(data.roomName, () => {
      // 해당 룸에 사용자가 나갔다는 메세지를 보냄.
      io.sockets.in(data.roomName).emit("OpenChatSend", {
        id: "Manager",
        nickname: "Manager",
        msg: "'" + data.nickname + "'" + " has left."
      });
    });
  });

  socket.on("OpenRoomDelete", data => {
    const rooms = io.sockets.adapter.rooms;
    const roomName = rooms[data.roomName];
    socket.emit("OpenRoomDelete", {
      roomName: roomName
    });
  });

  // 소켓 연결이 끊어졌을 떄 발생함.
  // 여기서 해줘야 할 이벤트는??
  socket.on("disconnect", () => {
    // 나갔을 때 인원수 업데이트 => NavBar
    io.sockets.emit("Now", {
      now: socket.client.conn.server.clientsCount
    });
  });
});
