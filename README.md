# Simple Web Wallet - Step 2: Checking the status of an unlocked account

## Overview

In this tutorial we will be using ConseilJS functions, which actually hit Conseil and Tezos nodes to retrieve data. The function we used in the first step, `unlockFundraiserIdentity`, didn't require to request information from a Conseil or Tezos node.

Here are the links to the API Documentations for the two functions we will be using in this step of the tutorial:

[isManagerKeyRevealedForAccount](https://cryptonomic.github.io/ConseilJS/modules/tezosnodewriter.html#ismanagerkeyrevealedforaccount)

[getAccount](https://cryptonomic.github.io/ConseilJS/modules/tezosconseilclient.html#getaccount)

As we will be making requests to a Conseil and Tezos server, we will first start with configuring our servers.

## Step 2.0 - Configure your servers

If you take a look at you utils folder you will notice that there is a new file called `servers.js`. We will use this file to save our server details and use them whenever necessary. Go ahead and open this file in your code editor.

You will notice that there are 2 fields in each server to be entered.

```javascript
export const conseilServer = {
  url: 'URL for your running instance of Alphanet Conseil Node',
  apiKey: 'API Key to access your Alphanet Conseil Node'
};

export const tezosServer = {
  url: 'URL for your running instance of Alphanet Tezos Node',
  apiKey: 'API Key to access your Alphanet Tezos Node'
}
```

Go ahead and fill these in! If you are not interested in running your own instances of Conseil and Tezos servers just yet, join our [developers channel](https://riot.im/app/#/room/#cryptonomic-developers:cryptonomic.tech) in Riot and ask for an API key to access our servers.


## Step 2.1 - Enhance your conseilUtils.js

We need to enchance our `conseilUtils.js` since we will be calling two more functions from ConseilJS. Bring up your code editor and follow below steps.

### Step 2.1.1 - Importing server settings

The functions we will be implementing in the following steps will require us to make requests from Conseil and Tezos servers. Start by importing the server details into your utils file.

`import { conseilServer, tezosServer } from './servers';`

### Step 2.1.2 - Import the necessary modules and functions from conseiljs

During the first step of this tutorial, we imported `TezosWalletUtil` to our project. Firstly, go ahead and add `TezosNodeWriter` and `TezosConseilClient` to this line of import.

Secondly, retrieve the `getAccount` function from the `TezosConseilClient` by copying below code piece.

`const { getAccount } = TezosConseilClient;`

Finally, write a similar code to retrieve the `isManagerKeyRevealedForAccount` function from the `TezosNodeWriter` module.

### Step 2.1.3 - Implement the abstractions

Let's start with implementing the `getAccountDetails` function. We will be using this function to check if the users account has been activated or not. If the account is activated, Conseil will return its details. If not, it will return `undefinded`.

This function will receive the Conseil server info, network name, and a public key hash as its parameters, and  query Conseil to retrieve the account details of the provided key hash.

We already provided the blank async call in the conseilUtils file. Go ahead and fill this function with the below code:

```
const account = await getAccount(
  conseilServer,
  'alphanet',
  pkh
);
return account;
```

Alright, let's continue with the `getRevealResults` function. This function will receive a KeyStore as its parameter. It will query Conseil to check if it is revealed or not, and return a boolean as the result.

Now here is a challenge! Can you write the function to get the reveal details? The `isManagerKeyRevealedForAccount` function of ConseilJS requires 2 parameters in the following order: **url of the Tezos server** (not the whole object, just the url) and a KeyStore, and returns return the reveal details.

Give it a try. If you get stuck, check the completed version of this [tutorial](https://github.com/Cryptonomic/ConseilJS-Tutorials/blob/2a9a57cbc4e99cbec2e27f56b348cee66eeb75ad/src/utils/conseilUtils.js#L58).

## Step 2.2 - Improve the FundraiserForm container

In this step we will be using the `getRevealResults` and `getAccountDetails` functions we just implemented in our container, and check the status of users accounts.

### Step 2.2.1 - Enhance import

Let's start by importing the above mentioned two functions to our container. Open up the `src/containers/FundraiserForm/index.js` file in your editor and see the instructions we provided in line 12.

### Step 2.2.2 - Implement isActivated and isRevealed functions

First stop, we will be implementing the `isActivated` function. This asynchronous function will receive users public key hash as a parameter and fetch the details of the account it is associated with. If the account we get as the result of our query matches the pkh we provided, then we will know that this account is active. Copy below code in the async call:

```
try {
  const queryResults = await getAccountDetails(pkh);
  const account = queryResults[0];
  return account.account_id === pkh;
} catch (err){
  return false;
}
```

Secondly, we will be implementing the `isRevealed` function. This asynchronous function will receive users KeyStore as its parameter and call the `getRevealResults` function and return its outcome. Now go ahead and try to write this one yourself. You can always check the completed version of this [tutorial](https://github.com/Cryptonomic/ConseilJS-Tutorials/blob/2a9a57cbc4e99cbec2e27f56b348cee66eeb75ad/src/containers/FundraiserForm/index.js#L57).

### Step 2.2.3 - Bind the functions to Unlock button

As for the final step of this tutorial, we will add the two functions we implemented above to our `handleSubmit` function, which deals with the `Unlock` button.

Scroll down to the handleSubmit function and find the line where you are prompted to paste below code:

`const isActive = await this.isActivated(keyStore.publicKeyHash);`

and complete the details for `isRevealed` yourself.

## Test it yourself!

Go ahead and start your application by executing `npm start` command.
Enter the details of the fundraiser account you got from the faucet during first step and hit unlock.
Since you have not yet activated or revealed this account, your app will take you automatically to `Activate` tab.

Try below accounts to see different results:

**This is an activated but not revealed account**

mnemonic: select claim property above win shallow decade risk garlic wet meat aunt kingdom face brief

secret: ab89f222f11b2e01ab790d56c6cb4068f5d837b1

pkh: tz1VJsgGVP5KUrGZQE6uuu2xsB6XahmWUqJK

password: 5VTNB89Ens

email: cflvi<span>gnn.euymmwbi@t</span>ezos.example.org

Note: This account was an active & not revealed account by the time of writing this tutorial. If you get activated & revealed as the result, then know that someone reading this tutorial decided to have fun and use this account at the 3rd step of this tutorial.

**This is an activated and revealed account**

mnemonic: also crane safe menu laugh plastic will injury buddy crisp wink multiply rival talk pill

secret: a6890ec5b2089c6f4f03fffe7c2dbb6b94edd37a

pkh: tz1RW2P6sMLUMDVWimgYK6LDgsFfRALPEXik

password: 0L1gKNSErX

emial: zdl<span>dmtej.otgksbuq@t</span>ezos.example.org

Note: This account was an active & revealed account by the time of writing this tutorial. If you get activated & not revealed as the result, then know that someone reading this tutorial decided to have fun conceal this account. "How can a revealed account can be concealed?" you might ask. That I am not answering so that it becomes harder for people to conceal it :)

## Congratulations!

You have completed the second step of the ConseilJS web-wallet tutorial. In this step, we learned how to implement functions that makes requests to Conseil and Tezos servers. You can check our [API Documentation](https://cryptonomic.github.io/ConseilJS/) to find the full list of functions available.

In the next step, we will create and inject operations to our Tezos node using ConseilJS. Feel free to discover the rest of the code and play around with it. When ready, stop your application by hitting `CTRL + C` and stash all the changes you did so far so you can switch to one of the following branches we listed below;

**First commit the changes you made on this branch**
```
git commit -m "completed the second step of web-wallet tutorial"
```

**Switch to the branch you desire**

If you couldn't manage to get your app running, checkout below branch to understand what went wrong.
```
git checkout web-wallet/step-2-complete
```
Open up this branch in your [browser](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-2-complete).


If you successfully completed this step, checkout below branch to implement functions which actually query a Conseil and Tezos server.
```
git checkout web-wallet/step-3
```
Open up this branch in your [browser](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-3).
