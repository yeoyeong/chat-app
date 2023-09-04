"use strict";
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
let messages = []; // add this line to store chat history
io.on("connection", (socket) => {
    socket.on("room", ({ name, message }) => {
        messages.push({ name, message });
        if (messages.length > 50) {
            messages.shift();
        }
        io.emit("room", { name, message });
        io.emit("chat history", messages); // 전체 데이터 전송
    });
    socket.on("chat history clear", (clean_arr) => {
        messages = clean_arr;
        io.emit("chat history", []); // 전체 데이터 전송
        //   socket.emit("chat history", messages); // 전체 데이터 전송
    });
});
// const cors = require("cors");
// app.use(cors());
// io.on("connection", function (socket: any) {
//   // 소켓 연결
//   socket.on("room", function (user_id: string) {
//     // user_id가 room에 입장
//     socket.join(user_id, () => {
//       console.log(user_id + "방입장");
//     });
//   });
//   console.log("a user connected");
//   socket.on("send message", (messageobject: any) => {
//     console.log(messageobject.name);
//     console.log(messageobject.body);
//     io.to(messageobject.name).emit("message", messageobject.body);
//   });
// });
server.listen(port, () => console.log(`listening on port ${port}!`));
