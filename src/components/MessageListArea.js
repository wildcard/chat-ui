// You'll render a list containing incoming chat messages, including your own messages.
// b. Rendered chat messages should show the avatar, username and chat message.
// c. Your own messages will have a different background color than other chat
// messages.

import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { MessagePropType } from '../prop-types';

function MessageListArea(props) {
  const { messages } = props;
  return (<div>
    {messages ? messages.map((message, index) => {
      return (<Message key={`${message.username}:${index}`} {...message}/>);
    }) : null}
    </div>);
}

MessageListArea.propTypes = {
  messages: PropTypes.arrayOf(MessagePropType)
}

export default MessageListArea;
