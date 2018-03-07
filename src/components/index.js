//This is your top level React component, you may change everything

import React from 'react';
import logo from '../assets/spotim-logo.jpg';
import { Container, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Snackbar from 'material-ui/Snackbar';
import Chat from './Chat';
import { HEADER_HEIGHT } from '../constants';

const Logo = styled.div`
  img {
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
`;

const Header = styled.div`
  height: ${HEADER_HEIGHT};
`;

function SpotimChatHeader(props) {
  return (
    <Header className="spotim-header">
      <div className="spotim-title">Welcome to the Spot.IM Chat app</div>

      <div>
        <Logo>
          <Image size={'tiny'} src={logo} />
        </Logo>
      </div>
    </Header>
  );
}

class App extends React.PureComponent {
  render() {
    return (
      <Container>
        <SpotimChatHeader />

        <Chat socket={this.props.socket} />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.props.disconnected}
          autoHideDuration={6000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              You have been disconnected, please try checking your network
            </span>
          }
        />
      </Container>
    );
  }
}

export default App;
