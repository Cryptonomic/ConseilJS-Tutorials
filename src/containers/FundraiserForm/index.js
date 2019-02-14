import React, { Component } from 'react';
import styled from 'styled-components';
import FundraiserTab from '../../components/FundraiserTab';
import { getInitIdentity } from '../../utils/general';

/**
* Step 1.2.1
* Get the unlockFundraiser function from conseilUtils.
*/

// Paste the code provided in ReadME to line 12.
import { unlockFundraiser } from '../../utils/conseilUtils'


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


/**
* Step 1.2.2
* Call the unlockFundraiser function when user clicks the Unlock button
* Unlock button triggers handleSubmit() function.
*/

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({error: ''});
    const {mnemonic, password, pkh, email, secret} = this.state;
    const {onChangeIdentity} = this.props;

    //Replace below code with the one provided in ReadME.
    const keyStore = await unlockFundraiser(mnemonic, email, password, pkh);

    if(!keyStore.error){
      this.setState({isUnlocked: true});

      const initIdentity = getInitIdentity();
      const newIdentity = {...initIdentity, ...keyStore};
      const activeTab = 0;
      onChangeIdentity(newIdentity, secret, activeTab);
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
