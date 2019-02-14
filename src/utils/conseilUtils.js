/**
* Step 2.1.1
* Import server details
*
*/

// Copy the code from walkthrough below to import server settings
import { conseilServer, tezosServer } from './servers';


/**
* Step 2.1.2
* Enhance import and get the necessary functions
*
*/

// Add TezosNodeWriter and TezosConseilClient to import
import { TezosWalletUtil, TezosNodeWriter, TezosConseilClient } from 'conseiljs';

// Copy the code to retrieve getAccount function from TezosConseilClient below
const { getAccount } = TezosConseilClient;

// Write code to get isManagerKeyRevealedForAccount function from TezosNodeWriter below
const { isManagerKeyRevealedForAccount } = TezosNodeWriter;


const { unlockFundraiserIdentity } = TezosWalletUtil;

export const unlockFundraiser = async (mnemonic, email, password, pkh) => {
  const identity = await unlockFundraiserIdentity(
    mnemonic,
    email.trim(),
    password.trim(),
    pkh.trim()
  );
  return identity;
}

/**
* Step 2.1.3
* Implement the abstraction functions and export
*
*/

// Copy the code from tutorial to define getAccountDetails function.
export const getAccountDetails = async (pkh) => {
  const account = await getAccount(
    conseilServer,
    'alphanet',
    pkh
  );
  return account;
}


// Fill in the details to getRevealResults yourself. This function should
// call isManagerKeyRevealedForAccount with 2 parameters; Tezos Server URL and KeyStore
export const getRevealResults = async (keyStore) => {
  const results = await isManagerKeyRevealedForAccount(
    tezosServer.url,
    keyStore
  );
  return results;
}
