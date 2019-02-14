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
const { isManagerKeyRevealedForAccount } = TezosNodeWriter;


/**
* Step 3.1.2
* Implement the abstractions for all 3 Tezos Operations
*
*/

const derivationPath = '';

// Paste the code from the walkthrough to return activationResult
export const activateAccount = async (keyStore, activationCode) => {

}

// Write the code to return revealResults
export const revealAccount = async (keyStore, fee) => {

}

// Implement a function to send a transaction




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
