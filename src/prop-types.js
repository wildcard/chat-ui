import PropTypes from 'prop-types';

export const UserPropType = PropTypes.shape({
  username: PropTypes.string,
  avatar: PropTypes.string,
});

export const MessagePropType = PropTypes.shape({
  ...UserPropType,
  // text: PropTypes.string.isRequired,
  isSelf: PropTypes.bool,
});
