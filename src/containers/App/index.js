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

const KeyStore = styled.div`
  margin: auto;
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
          <KeyStore>
            <strong>KeyStore details for this fundraiser account</strong><br/><br/>
            <strong>publicKey</strong><br/> {identity.publicKey}<br/>
            <strong>privateKey</strong><br/> {identity.privateKey}<br/>
            <strong>publicKeyHash</strong><br/> {identity.publicKeyHash}<br/>
            <strong>seed</strong><br/> {identity.seed}<br/>
            <strong>storeType</strong><br/> {identity.storeType}<br/>
            <strong>secret</strong><br/> {activationCode}<br/>
          </KeyStore>
          <StatusTabs
            activeTab={activeTab}
            activatedTabsCount={activatedTabsCount}
            setActiveTab={this.onChanageActiveTab}
          />
        </MainContainer>
      </Container>
    );
  }
}

export default App;
