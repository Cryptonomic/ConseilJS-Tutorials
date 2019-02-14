import { BigNumber } from 'bignumber.js';

const utez = 1000000;
const blockExplorerHost = 'http://alphanet.tzscan.io/';

export const openLink = (url) => {
  window.open(url, '_blank');
}

export function openLinkToBlockExplorer( url ) {
  openLink(blockExplorerHost + url);
}

export const clearOperationId = ( operationId ) => {
  if ( typeof operationId === 'string' ) {
    return operationId.replace(/\\|"|\n|\r/g, '');
  }
  return operationId;
}

export const utezToTez = (amount) => {
  return amount / utez;
}

export const tezToUtez = (amount) => {
  const x = new BigNumber(amount);
  return x.multipliedBy(utez).toNumber();
}

export const formatAmount = (amount, decimal = 6) => {
  return utezToTez(amount).toFixed(decimal);
}

export const getInitIdentity = () => {
  return {
    publicKey: '',
    privateKey: '',
    publicKeyHash: '',
    seed: '',
    storeType: '',
    active: false,
    reveal: false,
    operations: {},
    transactions: [
      {destination: '', amount: 0, operationId: ''}
    ]
  }
}

export const getKeyStore = (identify) => {
  const {publicKey, privateKey, publicKeyHash, storeType} = identify;
  return {
    publicKey,
    privateKey,
    publicKeyHash,
    storeType
  };
}
