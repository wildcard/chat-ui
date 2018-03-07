import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import ChatAvatar from './Avatar';
import { Message as MessagePropType } from '../prop-types';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    // flexWrap: 'wrap',
  },
  rootSelf: {
    justifyContent: 'flex-end',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    margin: theme.spacing.unit,
  },
  selfMessage: {

    color: '#fff',
    background: '#0082DD',
  },
});

function Message(props) {
  const {
    classes,
    username,
    text,
    avatar,
    isMe,
    prevMessageIsSameUser,
    ...other
  } = props;

  return (<div className={classNames(classes.root, {
    [classes.rootSelf]: isMe
  })} {...other}>
    <div className={classes.messageContainer}>
      {(prevMessageIsSameUser || isMe) ? null : <div className={classes.messageHead}>
        <ChatAvatar tiny src={avatar} username={username}/>
        <Typography gutterBottom noWrap>{username}</Typography>
      </div>}

      <Chip label={text} className={classNames(classes.message, {
          [classes.selfMessage]: isMe
        })} />
    </div>
    </div>);
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  ...MessagePropType,
};

export default withStyles(styles)(Message);
