
//This is then entry point for your app. Do as you wish.

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components";
import io from "socket.io-client";

ReactDOM.render(<App />, document.getElementById("root"));


//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");

window.io = io;
window.socket = socket;

// io.on('connection', function(socket){
//   socket.join('spotim/chat');
// });

socket.on("connect", function() {
  // io.to('spotim/chat').emit('message', 'Hi!');
  socket.emit('spotim/chat', { message: 'Hi! test', user: 'kobi' });
  
  socket.on('spotim/chat', (data) => {
    console.log('message recived!:', data);
  });
  
  console.log("connected to chat server!");
});

socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});
