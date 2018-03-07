import React from 'react';
import Avatar from './Avatar';
import renderer from 'react-test-renderer';

describe('snapshot', () => {
  it('', () => {
    const component = renderer.create(
      <Avatar username="kobi.kadosh"/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('tiny', () => {
    const component = renderer.create(
      <Avatar tiny username="kobi.kadosh"/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('big', () => {
    const component = renderer.create(
      <Avatar big username="kobi.kadosh"/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('src', () => {
    const component = renderer.create(
      <Avatar username="kobi.kadosh" src="https://s3.amazonaws.com/uifaces/faces/twitter/jeremiespoken/128.jpg"/>,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
