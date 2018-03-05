import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import ChatAvatar from './Avatar';
import { MessagePropType } from '../prop-types';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  message: {
    margin: theme.spacing.unit,
  },
  selfMessage: {
    background: 'green'
  },
});

function Message(props) {
  const {
    classes,
    username,
    text,
    avatar,
    isSelf,
    ...other,
  } = props;
  return (<div className={classes.root} {...other}>
        <div>
          <ChatAvatar tiny src={avatar} username={username}/>
          <Typography gutterBottom noWrap>{username}</Typography>
        </div>
        <Chip label={text} className={classNames(classes.message, {
          [classes.selfMessage]: isSelf
        })} />
    </div>);
}

Message.propTypes = {
  // classes: PropTypes.object.isRequired,
  ...MessagePropType,
};

export default withStyles(styles)(Message);
