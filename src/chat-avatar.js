import { hashCode } from 'hashcode';
const HashCode = hashCode();

export const images = [
  'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png',
];

export function chooseAvatar(username) {
  if (!username) {
    return null;
  }

  const userNameHashCode = HashCode.value(username);
  const avatarIndex = Math.abs(userNameHashCode % images.length);

  return images[avatarIndex];
}
