const express = require("express");
const app = express();
const port = 3001;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let messages: any = []; // add this line to store chat history

io.on("connection", (socket: any) => {
  socket.on("room", ({ name, message }: any) => {
    messages.push({ name, message });
    if (messages.length > 50) {
      messages.shift();
    }
    io.emit("room", { name, message });
    io.emit("chat history", messages); // 전체 데이터 전송
  });
  socket.on("chat history clear", (clean_arr: any) => {
    messages = clean_arr;
    io.emit("chat history", []); // 전체 데이터 전송
    //   socket.emit("chat history", messages); // 전체 데이터 전송
  });
});
server.listen(port, () => console.log(`listening on port ${port}!`));
