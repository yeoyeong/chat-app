// import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../App.css";
import { Button, TextField } from "@mui/material";

export default function Home() {
  const socket = io("http://localhost:3001");
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    socket.on("chat history", (messages: any) => {
      setChat(messages);
    });
    socket.on("room", ({ name, message }: any) => {
      setChat([...chat, { name, message }]);
    });
  }, []);

  const onTextChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("room", { name, message });
    socket.emit("chat history");
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }: any, index: number) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };
  const ClearChatHandler = () => {
    setChat([]);
    socket.emit("chat history clear", []);
  };
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
      <Button
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
        onClick={ClearChatHandler}
      >
        채팅내역초기화
      </Button>
    </div>
  );
}
