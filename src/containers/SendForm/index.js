import React, { Component } from 'react';
import SendTab from '../../components/SendTab';
import { clearOperationId, formatAmount, getInitIdentity, getKeyStore } from '../../utils/general';

/**
* Step 3.3.1
* Import the send function you created in conseilUtils, along with getAccountDetails function
*
*/

// Import your send function in below line. Do not remove getAccountDetails.
import { getAccountDetails } from '../../utils/conseilUtils';

class SendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: getInitIdentity(),
      balance: 0,
      destination: '',
      amount: 0,
      operationId: '',
      fee: 1420
    };
  }

  componentDidMount(){
    this.updateState();
    this.getInitBalance();
  }

  updateState = () => {
    const {identity} = this.props;
    const length = identity.transactions.length;
    const transaction = identity.transactions[length - 1];
    const {amount, destination, operationId} = transaction;
    this.setState({
      identity,
      amount,
      destination,
      operationId
    });
  }

  onInputChange = (value, key) => {
    this.setState({[key]: value});
  }

  getInitBalance = async () => {
    const {identity} = this.props;
    const pkh = identity.publicKeyHash;

    const account = await getAccountDetails(pkh);
    const balance = formatAmount(account[0].balance);

    this.setState({balance});
  }

  updateBalace = () => {
    const {balance, amount} = this.state;
    const fee = 0.001420;
    const newBalance = balance - amount - fee;
    this.setState({balance: newBalance});
  }

  /**
  * Step 3.3.2
  * Bind the `Send` button with the send function you impelemented.
  *
  */

  handleSubmit = async (event) => {
    event.preventDefault();
    const { onSend } = this.props;
    const {identity, destination, amount, fee} = this.state;
    const keyStore = getKeyStore(identity);

    try{

      // Call the send function you implemented, and complete users transaction request.
      const sendResults = {};



      /************ Do not alter below code ************/
      const operationId = clearOperationId(sendResults.operationGroupID);
      const newTransaction = {
        amount, operationId, destination
      };
      const length = identity.transactions.length;
      identity.transactions[length - 1] = newTransaction;
      this.updateBalace();
      this.setState({identity, operationId});
      onSend(identity);
    } catch (err){
      console.log(err);
    }
  }

  addTransaction = () => {
    const {identity} = this.state;
    const { onSend } = this.props;
    const newTransaction = {
      amount: 0, operationId: '', destination: ''
    };
    identity.transactions = identity.transactions.concat(newTransaction);
    this.setState({identity, amount: 0, operationId: '', destination: ''});
    onSend(identity);
  }

  render() {
    const {identity, balance, amount, destination, operationId} = this.state;
    const pkh = identity.publicKeyHash;
    return (
      <SendTab
        pkh={pkh}
        balance={balance}
        amount={amount}
        destination={destination}
        onInputChange={this.onInputChange}
        onClick={this.handleSubmit}
        operationId={operationId}
        addTransaction={this.addTransaction}
      />
    );
  }
}

export default SendForm;
