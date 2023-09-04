import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Message from "./pages/Message";
import Message2 from "./pages/Message2";
// import Chat from "./pages/Chat";
// import Join from "./pages/Join";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<Message />} />
      <Route path="/message2" element={<Message2 />} />
    </Routes>
  );
}

export default App;
