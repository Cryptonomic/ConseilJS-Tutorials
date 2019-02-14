# Simple Web wallet - Step 3: Creating and injecting operations to a Tezos Node

## Overview

In this tutorial, we will be using ConseiJS functions which will create and inject operations to our Tezos node.

Here are the links to the API Documentations for two of the three functions we will be using in this step of the tutorial. We are expecting you to find the third one and use it in your code as the final challenge of this tutorial series. The two functions we provide below will Activate an account, and Reveal an account. You need to find a third to help you send out transactions. Go ahead and decide on the function you will use from the [TezosNodeWriter module](https://cryptonomic.github.io/ConseilJS/modules/tezosnodewriter.html) now.

[sendIdentityActivationOperation](https://cryptonomic.github.io/ConseilJS/modules/tezosnodewriter.html#sendidentityactivationoperation)

[sendKeyRevealOperation](https://cryptonomic.github.io/ConseilJS/modules/tezosnodewriter.html#sendkeyrevealoperation)

## Step 3.0 - Refill your servers.js

Since we switched to a new branch, the server configurations you made in your `servers.js` is gone. Please go ahead and enter them one more time.

## Step 3.1 - Enhance your conseilUtils.js

We need to enhance our `conseilUtils.js` since we will be calling three more functions from ConseilJS. Bring up your code editor and follow below steps.

### Step 3.1.1 - Get the required TezosNodeWriter functions

We already imported the `TezosNodeWriter` from ConseilJS to use its `isManagerKeyRevealedForAccount` function in the second step of this tutorial. Let's start by getting the functions we will be using in this step:

`const { isManagerKeyRevealedForAccount, sendIdentityActivationOperation, sendKeyRevealOperation } = TezosNodeWriter;`

As per the main challenge, visit the ConseilJS API Documentation and find the third function you need to use to send transactions, and include its name in the above list.

### Step 3.1.2 - Implement the abstractions

Let's start with implementing by adding the abstraction layer to `sendIdentityActivationOperation`.

This function will require a Tezos Server URL, KeyStore, activation code, and a derivation path as a parameter to create the activation operation and inject it to the Tezos Node.

Derivation paths are strings which make it possible to access multiple addresses from a single account. To keep things simple, we will be using an empty derivation path through out this tutorial. We have defined the `derivationPath` as an empty string variable already in line 26.

#### sendIdentityActivationOperation

We already provided the blank async function called `activateAccount` in the conseilUtils file to send the identity activation operation. Go ahead and fill this function with the below code:

```
const activationResult = await sendIdentityActivationOperation(
  tezosServer.url,
  keyStore,
  activationCode,
  derivationPath
);
return activationResult;
```

The `activateAccount` function will receive two parameters from its caller. A keyStore with users public and private key information, and the activation code for users fundraiser account. After receiving these two, it will call ConseilJS' `sendIdentityActivationOperation`. It will pass both keyStore and activation code information sendKeyRevealOperationg with the URL to our Tezos Server and the derivation path we created above. As a result, `sendIdentityActivationOperation` will promise to return the details of the Activation Operation it created and injected into the Tezos network.

#### sendKeyRevealOperation

We already provided the blank async function called `revealAccount` in the conseilUtils file to send the public key reveal  operation, which receives keyStore and fee (to be discussed later) from its caller. Go ahead and fill this function yourself!

This function should call `sendKeyRevealOperation` with 4 parameters; the URL to your Tezos Server, users keyStore, fee, and a derivationPath and should return the results.


#### Send transaction

Now here is your first challenge! In this section we won't be providing you with any async calls and will expect you to implement this function from scratch. It will look very similar to what we have implemented in above two examples.

The send function you are exporting should again be asynchronous. The caller will pass 4 parameters to this async function:

1. A keyStore
2. A destination address: the address user will be sending the funds to
3. An amount: the amount of transaction
4. Fee: the fee for the transaction

After receiving these, it will call the ConseilJS function you decided to import. Here is a tip, this ConseilJS function you selected should require 6 parameters.

1. The URL to your Tezos Node
2. The keyStore
3. The destination address
4. parsedAmount: The amount user wants to send, represented in μTez (see below for details on this)
5. Fee
6. Derivation Path

Tezos nodes require the amounts to be represented in μTez (micro Tez). 1 Tez = 1000000 μTez.

For simplicity sake, we already implement a function to convert tez into μtez. Make sure to copy below code in your function right before making a call to ConseiJS, and send its result as the amount parameter.

`const parsedAmount = tezToUtez(Number(amount.replace(/,/g, '.')));`

Finally, you asynchronous function should return the operation result.

Good luck with this challenge. You can always check the completed version of this [tutorial](https://github.com/Cryptonomic/ConseilJS-Tutorials/blob/5499e5314342525bde496815418e12c217c80bce/src/utils/conseilUtils.js#L51) in case you get stuck.

## Step 3.1 - Call the functions you created above in containers

As per the final step of the tutorial, we need to call the abstractions we created above when user hits the according button in the wallet. If you take a look at your `src/containers` folder, you will notice that there are now 5 containers.

Activation Operation will be handled in `ActivationForm`, Reveal Operation will be handled in `RevealForm`, and Transactions will be handled in `SendForm` container.

### Activation Operation

#### Step 3.2.1 - Import activateAccount function to ActivateForm container

Again, we will start by importing the abstraction we created in `conseilUtils` to our container. Open the `src/containers/ActivateForm/index.js` file in your code editor and paste below line in line 12 to import it.

`import { activateAccount } from '../../utils/conseilUtils';`

#### Step 3.2.2 - Bind this function to the Activate button

Just like the `Unlock` button we worked on in the first step of this tutorial, `handleSubmit` function will be triggered when the user clicks on `Activate` button.

Since `sendIdentityActivationOperation` returns a promise, let's use a try{} block.

Copy the below code in try block to create and inject the activation operation to your Tezos Node!

`const activateResults = await activateAccount(keyStore, activationCode);`

You can skip the rest of the code in this block, which basically updates user identity with the operation results. One thing to keep in mind that, after a successful operation you can get the operation number from the results by getting its operationGroupID field. See `activateResults.operationGroupID` at line 49.

Done! Now the user can activate its fundraiser account through our simple web wallet!

#### Try it yourself!

Go ahead and start your application by executing `npm start` command. If you have completed the above steps fully, your application should compile with a few warnings (warnings about some variables we haven't used since we have not yet implemented Reveal and Send). Enter all the details for the Alphanet Fundraiser Account you got from the [Faucet](https://faucet.tzalpha.net/) and hit unlock. As soon as you unlock your fundraiser identity, the wallet should now take you to the Activation Tab. Click on the Acivate button and see what happens!

If everything goes well, you will see a new link with the `Operation ID` for the Activation Operation your wallet injected to the Tezos Node. Go ahead and click on the link, which will take you to a Tezos block explorer.

It might take some time for the operation you injected to be included in a block by a baker. If you see a 404 error saying `operation someOperationIdStartingWithO not found`, wait for some time (~15 sec) and refresh the page. Repeat until you see a `Success` screen.

Congratulations, you have just activated your test fundraiser account!

### Reveal Operation

#### Step 3.3.1 - Import revealAccount function to the container

Open the `src/containers/RevealForm/index.js` file in your code editor and start by importing the `revealAccount` function from `conseilUtils`.

#### Step 3.3.2 - Bind this function to the Reveal button

Different to the Activation container, you will notice that we have provided you with a constant variable called `fee` which is equal to **1300**. We could have made the fee flexible by prompting our user to enter it, but we wanted to keep the tutorial simple. 1300 μTez (0.0013 Tez) is the bare minimum fee required to reveal an account. Please refer to the [Protocol 003 Release Notes](https://tezos.gitlab.io/master/protocols/003_PsddFKi3.html) to have a better understanding on minimal fees.

Now go ahead and define the revealResults variable on line 45. Make sure to pass both the keystore and fee as parameters.

Done! Now the user can reveal its fundraiser account through our simple web wallet!

#### Try it yourself!

Go ahead and start your application by executing `npm start` command if it is not already running. Your application should compile with a few warnings (warnings about some variables we haven't used since we have not yet implemented Send). Once again, enter all the details for the Alphanet Fundraiser Account you got from the [Faucet](https://faucet.tzalpha.net/) and hit unlock. If you have activated your account in the last section, the wallet should take you to the Reveal Tab as soon as you unlock your fundraiser identity. Go ahead and click on the Reveal button and see what happens!

If everything goes well, you will see a new link with the `Operation ID` for the Reveal Operation your wallet injected to the Tezos Node. Go ahead and click on the link, which will take you to a Tezos block explorer.
It might take some time for the operation you injected to be included in a block by a baker. If you see a 404 error saying `operation someOperationIdStartingWithO not found`, wait for some time (~15 sec) and refresh the page. Repeat until you see a `Success` screen.

Congratulations, you have just revealed your test fundraiser account!

### Transaction Operation

Now this is your time to prove yourself and finish this tutorial series! Go ahead and import the function you created in conseilUtils to the container located at `src/containers/SendForm/index.js` and bind it to the 'Send' button by assigning it to `sendResults` variable.

#### Test it yourself!

Go ahead and start your application by executing `npm start` command if it is not already running. Enter the details of the fundraiser account you got from the faucet and hit unlock. If you have successfully activated and revealed your account, the wallet should take you directly to the send tab. Enter a random destination address, such as **tz1RjtZUVeLhADFHDL8UwDZA6vjWWhojpu5w** and enter some amount. Make sure that you enter an amount less than your available balance. Then go ahead and hit `Send`

Congratulations, you have just sent your first transaction through this simple web wallet you created! Check the `Operation ID` and wait until it is included in a block before sending out a new transaction.

## Conclusion

You have completed the ConseilJS-React Tutorial. Thank you for taking your time and trying out ConseiJS. In this tutorial series, we only showed a very few functions ConseilJS is capable of performing. You can create incredible projects using ConseilJS, including a production ready web/mobile wallet. In our next tutorial series, we will be showing how to create a a super simple, single .HTML page capable of querying a Conseil server. If you have any questions, comments, or suggestions, please create an issue in this repo, join our [Riot developers channel](https://riot.im/app/#/room/#cryptonomic-developers:cryptonomic.tech) or send an e-mail to [support@cryptonomic.tech](mailto:support@cryptonomic.tech).

Happy Hacking!

To visit the completed version of this tutorial:

```
git commit -m "completed the final step of web-wallet tutorial"
git checkout web-wallet/step-3-complete
```
Open up this branch in your [browser](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-3-complete).
