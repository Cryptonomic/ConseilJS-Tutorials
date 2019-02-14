import { conseilServer, tezosServer } from './servers'
import { tezToUtez } from './general';
import { TezosWalletUtil, TezosNodeWriter, TezosConseilClient } from 'conseiljs';

const { getAccount } = TezosConseilClient;
const { unlockFundraiserIdentity } = TezosWalletUtil;


/**
* Step 3.1.1
* Get the 3 TezosNodeWriter functions
*
*/

// Get sendIdentityActivationOperation, sendKeyRevealOperation, and a third function
// which we can use to send a transaction from TezosNodeWriter
const { isManagerKeyRevealedForAccount, sendIdentityActivationOperation, sendKeyRevealOperation, sendTransactionOperation } = TezosNodeWriter;


/**
* Step 3.1.2
* Implement the abstractions for all 3 Tezos Operations
*
*/

const derivationPath = '';

// Paste the code from the walkthrough to return activationResult
export const activateAccount = async (keyStore, activationCode) => {
  const activationResult = await sendIdentityActivationOperation(
    tezosServer.url,
    keyStore,
    activationCode,
    derivationPath
  );
  return activationResult;
}

// Write the code to return revealResults
export const revealAccount = async (keyStore, fee) => {
  const revealResult = await sendKeyRevealOperation(
    tezosServer.url,
    keyStore,
    fee,
    derivationPath
  );
  return revealResult;
}

// Implement a function to send a transaction
export const sendTezos = async (keyStore, destination, amount, fee) => {
  const parsedAmount = tezToUtez(Number(amount.replace(/,/g, '.')));
  const sendResult = await sendTransactionOperation(
    tezosServer.url,
    keyStore,
    destination,
    parsedAmount,
    fee,
    derivationPath
  );
  return sendResult;
}



export const unlockFundraiser = async (mnemonic, email, password, pkh) => {
  const identity = await unlockFundraiserIdentity(
    mnemonic,
    email.trim(),
    password.trim(),
    pkh.trim()
  );
  return identity;
}

export const getAccountDetails = async (pkh) => {
  const account = await getAccount(
    conseilServer,
    'alphanet',
    pkh
  );
  return account;
}

export const getRevealResults = async (keyStore) => {
  const revealResult = await isManagerKeyRevealedForAccount(
    tezosServer.url,
    keyStore
  );
  return revealResult;
}
