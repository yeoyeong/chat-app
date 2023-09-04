import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
// import { TextField } from "@material-ui/core";
import io from "socket.io-client";

const Message = (props) => {
  const socket = io("http://localhost:3001"); // 서버 주소 변경 필요
  const [state, setState] = useState({
    anchorEl: null,
    open: false,
    chat: "",
    yourID: "",
    messages: [],
    message: "",
  });

  useEffect(() => {
    const user_id = "yeoyeong";
    socket.emit("room", user_id);

    socket.on("your id", (id) => {
      setState((prevState) => ({ ...prevState, yourID: id }));
    });

    socket.on("message", (message) => {
      console.log(message);
      receivemessage(message);
    });
  }, []);

  const receivemessage = (message) => {
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  const onChange = (e) => {
    setState((prevState) => ({ ...prevState, message: e.target.value }));
  };

  const keyboard = (e) => {
    if (e.keyCode === 13) {
      console.log(`엔터키누름 :  ${state.chat}`);
      const messageobject = {
        name: "yeoyeong",
        body: state.message,
        id: state.yourID,
      };
      setState((prevState) => ({ ...prevState, message: "" }));
      socket.emit("send message", messageobject);
    }
  };

  const handleClose = (e) => {
    setState((prevState) => ({ ...prevState, anchorEl: null }));
  };

  const handleopen = (e) => {
    setState((prevState) => ({
      ...prevState,
      anchorEl: e.currentTarget,
      open: Boolean(e.currentTarget),
    }));
  };

  console.log(state);
  return (
    <div>
      <div>
        {state.messages.map((message, index) => (
          <div key={index}>
            {index}
            {message}
          </div>
        ))}
      </div>
      <label>입력</label>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="입력하세요."
        onKeyDown={keyboard}
        onChange={onChange}
        value={state.message}
      />
    </div>
  );
};

export default Message;
