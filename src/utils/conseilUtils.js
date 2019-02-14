/**
* Step 1.1
* import the TezosWalletUtil module of conseiljs
* and write a function to call unlockFundraiserIdentity
*
*/

// Paste the code provided in ReadME to line9.
import { TezosWalletUtil } from 'conseiljs';
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
