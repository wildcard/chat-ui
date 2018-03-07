import PropTypes from 'prop-types';

const User = {
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export const UserPropType = PropTypes.shape(User);

export const Message = {
  ...User,
  text: PropTypes.string.isRequired,
  isMe: PropTypes.bool,
  prevMessageIsSameUser: PropTypes.bool,
  isLast: PropTypes.bool,
};

export const MessagePropType = PropTypes.shape(Message);
