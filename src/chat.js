// You will use the Spot.IM Socket.IO chat server in order to send and receive messages. Endpoint and chat event name is found under   resources.txt   of the boilerplate.
// b. When the user sends a message you should use socket io to send messages in the following format:  {avatar:"...",username:"...",text:"..."'}
// i. You may add additional fields if you like.
// c. You should listen for and render incoming chat messages.

import { hashCode } from 'hashcode';
const HashCode = hashCode();

const EVENT_NAME = 'spotim/chat';

const images = [
  'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png',]

export function chooseAvatar(username) {
  const userNameHashCode = HashCode.value(username);
  const avatarIndex = Math.abs(userNameHashCode % images.length);

  return images[avatarIndex];
}

class Chat {
  constructor(socket, messageReceiveCallback) {
    this.socket = socket;
    this.messageReceiveCallback = messageReceiveCallback;
    this.user = this.getUser() || null;

    if (socket) {
      socket.on(EVENT_NAME, (data) => {
        messageReceiveCallback({...data, isSelf: data.username === this.user.username});
      });
    }
    //  else if (socket && socket.hasListeners()) {
    //   socket.off(EVENT_NAME);
    // }
  }

  getUser() {
    const persistedUsername = window.sessionStorage.getItem(`${EVENT_NAME}:username`);
    const persistedAvatar = window.sessionStorage.getItem(`${EVENT_NAME}:avatar`);

    return this.user || (persistedUsername && persistedAvatar && {
      username: persistedUsername,
      avatar: persistedAvatar
    });
  }

  setUser(username) {
    if (!username) {
      this.clearUser();
      return;
    }

    const avatar = chooseAvatar(username);

    this.user = {
      username,
      avatar
    };

    window.sessionStorage.setItem(`${EVENT_NAME}:username`, username);
    window.sessionStorage.setItem(`${EVENT_NAME}:avatar`, avatar);
  }

  clearUser() {
    this.user = null;
    window.sessionStorage.removeItem(`${EVENT_NAME}:username`);
    window.sessionStorage.removeItem(`${EVENT_NAME}:avatar`);
  }

  send(text) {
     if (!this.socket) {
       throw new Error('Chat has been initialized with out a socket object!, can\'t call send yet');
     }

     if (!this.user) {
       throw new Error("User hasn't been set yet, please call 'setUser'");
     }

    this.socket.emit(EVENT_NAME, {
      text,
      ...this.user,
    });
  }
}

export default Chat;
