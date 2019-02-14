import React, { Component } from 'react';
import styled from 'styled-components';
import FundraiserTab from '../../components/FundraiserTab';
import { getInitIdentity } from '../../utils/general';

import { unlockFundraiser, getAccountDetails, getRevealResults } from '../../utils/conseilUtils'

const FormContainer = styled.form`
  width: 100%;
  opacity: ${({ isUnlocked }) => isUnlocked ? 0.5 : 1};
`;

class FundraiserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      password: '',
      pkh: '',
      email: '',
      secret: '',
      error:'',
      isUnlocked: false
    };
  }

  onInputChange = (value, key) => {
    this.setState({[key]: value});
  }

  isActivated = async (pkh) => {
    try {
      const queryResults = await getAccountDetails(pkh);
      const account = queryResults[0];
      return account.account_id === pkh;
    } catch (err){
      return false;
    }
  }

  isRevealed = async (keyStore) => {
    try {
      const queryResults = await getRevealResults(keyStore);
      return queryResults
    } catch (err){
      return false;
    }
  }

  setActiveTab = (isActive, isRevealed, newIdentity) => {

    let tabInfo = {
      activeTab: 0,
      activatedTabsCount: 1
    }

    if(!isActive){
        tabInfo.activeTab = 0;
        tabInfo.activatedTabsCount = 1;
      } else if(!isRevealed){
        tabInfo.activeTab = 1
        tabInfo.activatedTabsCount = 2;
        newIdentity.active = true;
      } else{
        tabInfo.activeTab = 2
        tabInfo.activatedTabsCount = 3;
        newIdentity.active = true;
        newIdentity.reveal = true;
      }

      return [tabInfo, newIdentity];
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({error: ''});
    const {mnemonic, password, pkh, email, secret} = this.state;
    const {onChangeIdentity} = this.props;


    const keyStore = await unlockFundraiser(mnemonic, email, password, pkh);

    if(!keyStore.error){
      this.setState({isUnlocked: true});
      const initIdentity = getInitIdentity();
      let newIdentity = {...initIdentity, ...keyStore};



      const isActive = await this.isActivated(keyStore.publicKeyHash);
      const isRevealed = await this.isRevealed(keyStore);



      const activeTabResults = this.setActiveTab(isActive, isRevealed, newIdentity);
      onChangeIdentity(activeTabResults[1], secret, activeTabResults[0].activeTab, activeTabResults[0].activeTabResults);
    }
    else{
      this.setState({error: keyStore.error})
    }
  }

  render() {
    const {mnemonic, password, pkh, email, secret, isUnlocked, error} = this.state;
    return (
      <FormContainer onSubmit={this.handleSubmit} isUnlocked={isUnlocked}>
        <FundraiserTab
          mnemonic={mnemonic}
          password={password}
          pkh={pkh}
          email={email}
          secret={secret}
          isUnlocked={isUnlocked}
          onInputChange={this.onInputChange}
          error={error}
        />
      </FormContainer>
    );
  }
}

export default FundraiserForm;
