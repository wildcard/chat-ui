import Chat, { generateMessage, EVENT_NAME, NullSocketError, NullUserError, ChatMessageFormatError } from './chat';
import { images } from './chat-avatar';
import faker from 'faker';

class SocketMock {
  on (event, cb) {
    this.cb = cb;
  }
  emit(event, message) {
    this.cb(message);
  }
}

describe('Chat errors', () => {
  let chat = null;
  let send = null;

  beforeEach(() => {
    const message = faker.lorem.text();
    chat = new Chat();
    send = function () {
      chat.send(message);
    }
  });

  it('throw multiple errors for send', () => {
    expect(send).toThrow();
  })

  it('throw user error for send', () => {
    const message = faker.lorem.text();
    const socketMock = {
      on: jest.fn(),
      emit: jest.fn(),
    };
    const chat = new Chat(socketMock);
    function send () {
      chat.send(message);
    }

    expect(send).toThrow(NullUserError);
  })

  it('throw socket error for send', () => {
    chat.setUser(faker.internet.userName());
    expect(send).toThrow(NullSocketError);
  })
})

describe('generateMessage', () => {
  describe('ChatMessageFormatError', () => {
    it('empty message throw errors', () => {
      function message() {
        generateMessage({})
      }
      expect(message).toThrow(ChatMessageFormatError);
    });

    it('empty message throws', () => {
      expect(function () {
        generateMessage({
          text: '',
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
        })
      }).toThrow(ChatMessageFormatError);
    });

    it('missing message properties throw errors', () => {
      expect(function () {
        generateMessage({
          text: '',
        })
      }).toThrow(ChatMessageFormatError);

      expect(function () {
        generateMessage({
          username: '',
        })
      }).toThrow(ChatMessageFormatError);

      expect(function () {
        generateMessage({
          text: faker.lorem.text(),
        })
      }).toThrow(ChatMessageFormatError);

      expect(function () {
        generateMessage({
          username: faker.internet.userName(),
        })
      }).toThrow(ChatMessageFormatError);

      expect(function () {
        generateMessage({
          avatar: faker.image.avatar(),
        })
      }).toThrow(ChatMessageFormatError);
    });

    it('missing property avatar throws', () => {
      expect(function () {
        generateMessage({
          username: faker.internet.userName(),
          text: faker.lorem.text(),
        })
      }).toThrow(ChatMessageFormatError);
    });

    it('missing property username throws', () => {
      expect(function () {
        generateMessage({
          text: faker.lorem.text(),
          avatar: faker.image.avatar(),
        })
      }).toThrow(ChatMessageFormatError);
    });

    it('missing property text throws', () => {
      expect(function () {
        generateMessage({
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
        })
      }).toThrow(ChatMessageFormatError);
    });
  });

  it('', () => {
    const rawMessageData = {
      text: faker.lorem.text(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };
    const message = generateMessage(rawMessageData);

    expect(message).toEqual(rawMessageData);
  });

  it('snapshot', () => {
    const rawMessageData = {
      text: 'text message',
      username: 'kobi.kadosh',
      avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
    };
    const message = generateMessage(rawMessageData);

    expect(message).toMatchSnapshot();
  });

  it('have isMe', () => {
    const username = faker.internet.userName();
    const rawMessageData = {
      text: faker.lorem.text(),
      username,
      avatar: faker.image.avatar(),
    };
    const message = generateMessage(rawMessageData, username);

    expect(message).toEqual({...rawMessageData, isMe: true});
  });

  it('doesn\'t have isMe', () => {
    const username = faker.internet.userName();
    const rawMessageData = {
      text: faker.lorem.text(),
      username,
      avatar: faker.image.avatar(),
    };
    const message = generateMessage(rawMessageData, faker.internet.userName('kobi'));

    expect(message).toEqual({...rawMessageData, isMe: false});
  });

  it('have prevMessageIsSameUser', () => {
    const username = faker.internet.userName();
    const rawMessageData = {
      text: faker.lorem.text(),
      username,
      avatar: faker.image.avatar(),
    };
    const lastMessage = {
      text: faker.lorem.text(),
      username,
      avatar: faker.image.avatar(),
    };
    const message = generateMessage(rawMessageData, faker.internet.userName(), lastMessage);
    expect(message).toEqual({...rawMessageData, isMe: false, prevMessageIsSameUser: true});

    const message2 = generateMessage(rawMessageData, username, lastMessage);
    expect(message2).toEqual({...rawMessageData, isMe: true, prevMessageIsSameUser: true});

    const message3 = generateMessage(rawMessageData, null, lastMessage);
    expect(message3).toEqual({...rawMessageData, prevMessageIsSameUser: true});
  });

  it('doesn\'t have prevMessageIsSameUser', () => {
    const username = faker.internet.userName();
    const rawMessageData = {
      text: faker.lorem.text(),
      username,
      avatar: faker.image.avatar(),
    };
    const lastMessage = {
      text: faker.lorem.text(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };
    const message = generateMessage(rawMessageData, faker.internet.userName(), lastMessage);
    expect(message).toEqual({...rawMessageData, isMe: false, prevMessageIsSameUser: false});

    const message2 = generateMessage(rawMessageData, username, lastMessage);
    expect(message2).toEqual({...rawMessageData, isMe: true, prevMessageIsSameUser: false});

    const message3 = generateMessage(rawMessageData, null, lastMessage);
    expect(message3).toEqual({...rawMessageData, prevMessageIsSameUser: false});
  });
});

describe('Chat', () => {
  let chat = null;
  const socketMock = {
    on: jest.fn(),
    emit: jest.fn(),
  };
  let messageReceiveCallbackMock = jest.fn();

  beforeEach(() => {
    chat = new Chat(socketMock, messageReceiveCallbackMock);
  });

  it('send with socket', () => {
    chat.setUser(faker.internet.userName());
    chat.send('test message');

    expect(socketMock.emit.mock.calls.length).toBe(1);
    expect(socketMock.emit.mock.calls[0][0]).toBe(EVENT_NAME);
    expect(socketMock.emit.mock.calls[0][1]).toHaveProperty('text', 'test message');
  });

  it('saves lastMessage', () => {
    const socketMock = new SocketMock();
    const chat = new Chat(socketMock, messageReceiveCallbackMock);
    const username = faker.internet.userName();
    const text = faker.lorem.text();

    expect(chat.lastMessage).toBeNull();
    chat.setUser(username);
    chat.send(text);
    expect(messageReceiveCallbackMock.mock.calls.length).toBe(1);
    expect(chat.lastMessage).toEqual({
      username,
      text,
      isMe: true,
      avatar: chat.user.avatar
    });
  });

  describe('User', () => {
    beforeEach(() => {
      sessionStorage.clear;
    });

    it('setUser', () => {
      const username = faker.internet.userName();
      chat.setUser(username);

      expect(chat.user.username).toBe(username);
      expect(images).toContain(chat.user.avatar);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(`${EVENT_NAME}:username`, username);
    });

    it('setUser empty', () => {
      chat.setUser();
      expect(chat.user).toBeNull();
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(`${EVENT_NAME}:username`);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(`${EVENT_NAME}:avatar`);
    });

    it('getUser', () => {

    });

    it('clearUser', () => {
      chat.clearUser();
      expect(chat.user).toBeNull();
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(`${EVENT_NAME}:username`);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(`${EVENT_NAME}:avatar`);
    });


  });
})
