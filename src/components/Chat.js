import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ChatService from '../chat';
import MessageCreationArea from './MessageCreationArea';
import MessageListArea from './MessageListArea';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 150px)',
  },

}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = props;

    this.service = new ChatService(socket, this.receiveMessage);
    this.state = {
      messages: [
        // {text: 'kobi kadosh', username: 'kobi 1'},
        // {text: 'kobi 2', username: 'kobi 2', isMe: true },
        // {text: 'kobi 1 1', username: 'kobi' },
        // {text: 'kobi 1 1', username: 'kobi', prevMessageIsSameUser: true},
        // {text: 'kobi 1 1', username: 'kobi', prevMessageIsSameUser: true},
        // {text: 'kobi 2', username: 'kobi 2', isMe: true },
        // {text: 'kobi 2', username: 'kobi 2', isMe: true, prevMessageIsSameUser: true },
        // {text: 'kobi', username: 'kobi'},
        // {text: 'kobi 2', username: 'kobi 2', isMe: true },
        // {text: 'kobi 2', username: 'kobi 2', isMe: true, prevMessageIsSameUser: true },
      ],
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
    this.setState({
      messages: [...this.state.messages.slice(0), data]
    })
  }

  sendMessage = (text) => {
    return this.service.send(text);
  }

  render() {
    const { classes } = this.props;
    const {
      messages
    } = this.state;

    return <div className={classes.root}>
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

export default withStyles(styles)(Chat);
