import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import io from 'socket.io-client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//connecting to Socket.IO chat server
const socket = io('https://spotim-demo-chat-server.herokuapp.com');

it('renders without crashing + socket', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App socket={socket} />, div);
});

it('renders without crashing disconnected', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App disconnected socket={null} />, div);
});
