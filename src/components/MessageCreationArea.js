// Area will be fixed to the bottom of the screen.
// b. Text field for username.
//  i. Should be persistent across browser refreshes.
// c. Textarea for text.
//  i. Should be cleared after each message is sent.
// d. Send button to send text messages.
// e. An avatar image
//  i. Each user will randomly receive one of 5 avatar images.
//  ii. Avatar images should be persistent across browser refreshes
// f. Users can't send empty messages

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import ChatAvatar from './Avatar';
import { UserPropType } from '../prop-types';

const styles = theme => {
  const textField = {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  };

  return {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField,
    errorTextField: {
      ...textField,
      background: 'red',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  };
};

class MessageCreationArea extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;

    this.state = {
      username: '',
      ...user,
      message: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    if (name === 'message' && event.target.value) {
      this.setState({ emptyMessage: false })
    } else if (name === 'username') {
      this.props.setUsername(event.target.value);
    }
  };

  clearMessage() {
    this.setState({ message: '' });
  }

  send = () => {
    const {
      message,
    } = this.state;

    const {
      sendMessage,
    } = this.props;

    if (!message) {
      this.setState({ emptyMessage: true })
      return;
    }

    if (sendMessage) {
      sendMessage(message);
      this.setState({ message: '' })
    }
  }

  render() {
    const { classes } = this.props;
    const messageError = this.state.emptyMessage && this.state.message === '';

    return (<form className={classes.container}
        onSubmit={this.send}
        noValidate autoComplete="off">
        <TextField
              id="username"
              label="User Name"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
              InputProps={{
                startAdornment: this.state.username && <InputAdornment position="start">
                  <ChatAvatar tiny username={this.state.username} src={this.avatar} />
                </InputAdornment>,
              }}
            />

        <TextField
          id="message"
          label="Message"
          multiline
          rowsMax="4"
          value={this.state.message}
          onChange={this.handleChange('message')}
          className={messageError ? classes.errorTextField : classes.textField}
          helperText={messageError ? "I'm sure you have something smart to share with your friends 🤓" : null}
          margin="normal"
        />

        <Button onClick={this.send}
          className={classes.button}
          variant="raised" color="primary">
          Send
          <SendIcon className={classes.rightIcon}/>
        </Button>
      </form>);
  }
}

MessageCreationArea.propTypes = {
  classes: PropTypes.object.isRequired,
  user: UserPropType,
  setUsername: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default withStyles(styles)(MessageCreationArea)
