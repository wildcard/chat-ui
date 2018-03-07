import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { chooseAvatar } from '../chat-avatar';

const styles = {
  avatar: {
    margin: 10,
  },
  tiny: {
    width: 20,
    height: 20,
  },
  big: {
    width: 60,
    height: 60,
  },
};

function ChatAvatar(props) {
  const { classes, username, src, tiny, big, ...other } = props;

  const avatarImageSrc = src || chooseAvatar(username);

  return (
    <Avatar
      alt={username}
      src={avatarImageSrc}
      className={classNames(
        {
          [classes.big]: big,
          [classes.tiny]: tiny,
        },
        classes.avatar
      )}
      {...other}
    />
  );
}

ChatAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  src: PropTypes.string,
  big: PropTypes.bool,
  tiny: PropTypes.bool,
};

export default withStyles(styles)(ChatAvatar);
