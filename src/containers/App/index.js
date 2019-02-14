import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import FundraiserForm from '../FundraiserForm';
import StatusTabs from '../../components/StatusTabs';
import {getInitIdentity} from '../../utils/general';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const MainContainer = styled.div`
  padding: 0 35px 35px 35px;
  max-width: 900px;
  margin: 0 auto;
`;

const Message = styled.div`
  margin: 20px auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: getInitIdentity(),
      activeTab: -1,
      activationCode: '',
      activatedTabsCount: 0
    };
  }

  onChangeIdentity = (identity, activationCode, activeTab, activatedTabsCount) => {
    this.setState({identity, activationCode, activeTab, activatedTabsCount});
  }

  onChanageActiveTab = (activeTab) => {
    this.setState({activeTab});
  }

  render() {
    const {identity, activeTab, activationCode, activatedTabsCount} = this.state;
    return (
      <Container>
        <Header />
        <MainContainer>
          <FundraiserForm onChangeIdentity={this.onChangeIdentity} />
          <StatusTabs
            activeTab={activeTab}
            activatedTabsCount={activatedTabsCount}
            setActiveTab={this.onChanageActiveTab}
          />
          {activeTab !== -1 &&
            ( identity.reveal ? (
                <Message>
                  This account has been activated and revealed. It is ready to send transactions!<br/>
                </Message>
              ) : identity.active ? (
                <Message>
                  This account has been activated. It is ready to reveal.<br/>
                </Message>
              ) : (
                <Message>
                  This account has not been activated.<br/>
                  Use the following activation code to activate: {activationCode}
                </Message>
              )
            )}
          </MainContainer>
      </Container>
    );
  }
}

export default App;
