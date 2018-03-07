// You will use the Spot.IM Socket.IO chat server in order to send and receive messages. Endpoint and chat event name is found under   resources.txt   of the boilerplate.
// b. When the user sends a message you should use socket io to send messages in the following format:  {avatar:"...",username:"...",text:"..."'}
// i. You may add additional fields if you like.
// c. You should listen for and render incoming chat messages.
import { chooseAvatar } from './chat-avatar';

export const EVENT_NAME = 'spotim/chat';

export class NullSocketError extends Error {
}

export class NullUserError extends Error {
}

export class ChatMessageFormatError extends Error {
  constructor({data: rawMessageData, missingProperty} = {}, ...params) {
    super(...params);

    this.rawMessageData = rawMessageData;
    this.missingProperty = missingProperty;
  }
}

function validateMessageFormat(data) {
  if (!data) {
    throw new ChatMessageFormatError('falsy object can\'t be a message');
  }

  const {
    avatar,
    username,
    text,
  } = data;

  ['avatar',
  'username',
  'text'].forEach(requiredProperty => {
    if (!data[requiredProperty]) {
      throw new ChatMessageFormatError({data, missingProperty: requiredProperty}, `${requiredProperty} is required for any message`);
    }
  });
}

export function generateMessage(data, username, lastMessage) {
  let message = {...data};

  validateMessageFormat(data);

  if (username) {
    message.isMe = data.username === username;
  }

  if (lastMessage) {
    message.prevMessageIsSameUser = lastMessage.username === data.username;
  }

  return message;
}

class Chat {
  constructor(socket, messageReceiveCallback) {
    this.socket = socket;
    this.messageReceiveCallback = messageReceiveCallback;
    this.user = this.getUser() || null;
    this.lastMessage = null;

    if (socket) {
      socket.on(EVENT_NAME, (data) => {
        const message = generateMessage(data, this.user.username, this.lastMessage);

        messageReceiveCallback(message);
        this.lastMessage = message;
      });
    }
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
       throw new NullSocketError('Chat has been initialized without a socket object!, can\'t call send yet');
     }

     if (!this.user) {
       throw new NullUserError("User hasn't been set yet, please call 'setUser'");
     }

    this.socket.emit(EVENT_NAME, {
      text,
      ...this.user,
    });
  }
}

export default Chat;
