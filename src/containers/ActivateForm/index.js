import React, { Component } from 'react';
import ActivationTab from '../../components/ActivationTab';
import { clearOperationId, getInitIdentity, getKeyStore } from '../../utils/general';

/**
* Step 3.2.1
* Import activateAccount function from conseilUtils
*
*/

// Paste the code from walkthrougn in the below line.
import { activateAccount } from '../../utils/conseilUtils';

class ActivateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: getInitIdentity(),
      error: ''
    };
  }

  componentDidMount(){
    this.updateState();
  }

  updateState = () => this.setState({
    identity: this.props.identity
  });

  /**
  * Step 3.2.2
  * Bind the 'Activate' button with activateAccount function.
  *
  */

  handleSubmit = async (event) => {
    event.preventDefault();
    const { identity, activationCode, onActivate } = this.props;
    const keyStore = getKeyStore(identity);

    try{

      // Activate users account by pasting the code from the walkthrough in below line.
      const activateResults = await activateAccount(keyStore, activationCode);


      /************ Do not alter below code ************/
      const operationId = clearOperationId(activateResults.operationGroupID);
      identity.operations.created = operationId;
      identity.active = true;
      this.setState({identity});
      const activeTab = 0;
      onActivate(activeTab, identity);
    } catch(err) {
      this.setState({error: 'Secret you entered seems to be incorrect. Please refresh the page and try again.'});
    }
  }

  render() {
    const {identity, error} = this.state;
    const pkh = identity.publicKeyHash;
    const isAccountActive = identity.active;
    const operationId = identity.operations.created;
    return (
      <ActivationTab
        pkh={pkh}
        isAccountActive={isAccountActive}
        onClick={this.handleSubmit}
        operationId={operationId}
        error={error}
      />
    );
  }
}

export default ActivateForm;
