import React from 'react';
import Message from './Message';
import renderer from 'react-test-renderer';

describe('snapshot', () => {
  it('', () => {
    const component = renderer.create(
      <Message username="kobi.kadosh" text="test message" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('avatar', () => {
    const component = renderer.create(
      <Message
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/jeremiespoken/128.jpg"
        username="kobi.kadosh"
        text="test message"
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('isMe', () => {
    const component = renderer.create(
      <Message isMe username="kobi.kadosh" text="test message" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('isMe is differnt than regular message design', () => {
    const myMessage = renderer.create(
      <Message isMe username="kobi.kadosh" text="test message" />
    );
    const message = renderer.create(
      <Message isMe username="kobi.kadosh" text="test message" />
    );

    let treeA = myMessage.toJSON();
    let treeB = message.toJSON();

    expect(treeA).not.toEqual(treeB);
  });

  it('isMe + prevMessageIsSameUser', () => {
    const component = renderer.create(
      <Message
        isMe
        prevMessageIsSameUser
        username="kobi.kadosh"
        text="test message"
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('prevMessageIsSameUser', () => {
    const component = renderer.create(
      <Message
        prevMessageIsSameUser
        username="kobi.kadosh"
        text="test message"
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('isLast', () => {
    const component = renderer.create(
      <Message isLast username="kobi.kadosh" text="test message" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
