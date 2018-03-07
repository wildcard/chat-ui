// You'll render a list containing incoming chat messages, including your own messages.
// b. Rendered chat messages should show the avatar, username and chat message.
// c. Your own messages will have a different background color than other chat
// messages.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Message from './Message';
import { MessagePropType } from '../prop-types';
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../constants';

const styles = {
  root: {
    flex: '1 0 auto',
    maxHeight: `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
    overflowY: 'auto',
  },
};

function MessageListArea(props) {
  const { messages, classes } = props;
  const lastMessageIndex = messages && messages.length - 1;

  return (
    <div className={classes.root}>
      {messages
        ? messages.map((message, index) => {
            return (
              <Message
                key={`${message.username}:${index}`}
                {...message}
                isLast={lastMessageIndex === index}
              />
            );
          })
        : null}
    </div>
  );
}

MessageListArea.propTypes = {
  messages: PropTypes.arrayOf(MessagePropType),
};

export default withStyles(styles)(MessageListArea);
