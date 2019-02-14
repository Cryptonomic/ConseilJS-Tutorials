import React, { Component } from 'react';
import RevealTab from '../../components/RevealTab';
import { clearOperationId, getInitIdentity, getKeyStore } from '../../utils/general';

/**
* Step 3.3.1
* Import revealAccount function from conseilUtils
*
*/

// Write an import function in below line to import revealAccount function from conseilUtils
import { revealAccount } from '../../utils/conseilUtils';

class RevealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: getInitIdentity()
    };
  }

  componentDidMount(){
    this.updateState();
  }

  updateState = () => this.setState({
    identity: this.props.identity
  });

  /**
  * Step 3.3.2
  * Bind the 'Reveal' button with revealAccount function.
  *
  */

  handleSubmit = async (event) => {
    event.preventDefault();
    const { identity, onReveal } = this.props;
    const keyStore = getKeyStore(identity);

    try {

      const fee = 1300;
      // Reveal users account by calling the revealAccount function.
      const revealResults = await revealAccount(keyStore, fee);



      /************ Do not alter below code ************/
      const operationId = clearOperationId(revealResults.operationGroupID);
      identity.operations.revealed = operationId;
      identity.reveal = true;
      this.setState({identity});
      const activeTab = 1;
      onReveal(activeTab, identity);
    } catch(err){
      console.log(err);
    }
  }

  render() {
    const {identity} = this.state;
    const pkh = identity.publicKeyHash;
    const isAccountRevealed = identity.reveal;
    const operationId = identity.operations.revealed;
    return (
      <RevealTab pkh={pkh} isAccountRevealed={isAccountRevealed} onClick={this.handleSubmit} operationId={operationId} />
    );
  }
}

export default RevealForm;
