import React from 'react';
import PropTypes from 'prop-types';
import ChatService from '../chat';
import MessageCreationArea from './MessageCreationArea';
import MessageListArea from './MessageListArea';
import { MessagePropType } from '../prop-types';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;

    this.service = new ChatService(socket, this.receiveMessage);
    this.state = {
      messages: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { socket } = this.state;
    if (socket !== nextProps.socket) {
        this.service = new ChatService(nextProps.socket, this.receiveMessage);
    }
  }

  componentDidMount() {
    const { socket } = this.props;

    if (socket) {
        this.service = new ChatService(socket, this.receiveMessage);
    }
  }

  setUsername = (username) => {
    this.service.setUser(username);
  }

  receiveMessage = (data) => {
    console.log('message recived!:', data);
    this.setState({
      messages: [...this.state.messages.slice(0), data]
    })
  }

  sendMessage = (text) => {
    return this.service.send(text);
  }

  render() {
    const {
      messages
    } = this.state;

    return <div>
      <MessageListArea messages={messages}/>

      <MessageCreationArea
        user={this.service.getUser()}
        setUsername={this.setUsername}
        sendMessage={this.sendMessage}
        />
    </div>
  }
}

Chat.propTypes = {
  socket: PropTypes.object,
}

export default Chat;
