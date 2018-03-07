import { chooseAvatar, images } from './chat-avatar';
import faker from 'faker';

describe('chooseAvatar', () => {
  let username = null;
  beforeEach(() => {
    username = faker.internet.userName();
  });

  it('returns null for empty username input', () => {
    expect(chooseAvatar()).toBeNull();
  });

  it('returns the same image for the same username', () => {
    let avatarA = chooseAvatar(username);
    let avatarB = chooseAvatar(username);

    expect(avatarA).toEqual(avatarB);
  });

  it('returns a image from the included list', () => {
    expect(images).toContain(chooseAvatar(username));
  })
});
