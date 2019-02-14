import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import FundraiserForm from '../FundraiserForm';
import StatusTabs from '../../components/StatusTabs';
import ActivateForm from '../ActivateForm';
import RevealForm from '../RevealForm';
import SendForm from '../SendForm';
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

const LoaderContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: getInitIdentity(),
      activeTab: -1,
      activationCode: '',
      activatedTabsCount: 0,
      isLoading: false
    };
  }

  onChangeIdentity = (identity, activationCode, activeTab, activatedTabsCount) => {
    this.setState({identity, activationCode, activeTab, activatedTabsCount});
  }

  onActivate = (activeTab, identity) => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({activeTab, identity, activatedTabsCount: 2, isLoading: false});
    }, 5000);
  }

  onReveal = (activeTab, identity) => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({activeTab, identity, activatedTabsCount: 3, isLoading: false});
    }, 5000);
  }

  onSend = (identity) => {
    this.setState({identity, activatedTabsCount: 4});
  }

  onChanageActiveTab = (activeTab) => {
    this.setState({activeTab});
  }

  render() {
    const {identity, activeTab, activationCode, activatedTabsCount,isLoading} = this.state;
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
          {activeTab === 0 &&
            <ActivateForm onActivate={this.onActivate} identity={identity} activationCode={activationCode} />
          }
          {activeTab === 1 &&
            <RevealForm onReveal={this.onReveal} identity={identity} />
          }
          {activeTab === 2 &&
            <SendForm onSend={this.onSend} identity={identity} />
          }
          </MainContainer>
          {isLoading &&
          <LoaderContainer>
            Wait for this operation to be confirmed on chain before proceeding to the next step.
          </LoaderContainer>
        }
      </Container>
    );
  }
}

export default App;
