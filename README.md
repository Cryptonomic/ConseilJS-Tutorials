# Simple Web Wallet - Step 1: Unlocking the Fundraiser Account

## Overview

In this tutorial we will be implementing our first ConseilJS call. This call will not make a request to Conseil or Tezos server, but instead use its built-in utilities to unlock a fundraiser account.

We will be using the container called `FundraiserForm` to deal with the fundraiser details inputted by the user. We will bind the `Unlock` button in this form to the `unlockFundraiserIdentity` function of ConseilJS.

API Documentation to [unlockFundraiserIdentity](https://cryptonomic.github.io/ConseilJS/modules/tezoswalletutil.html#unlockfundraiseridentity)

It is possible to import ConseilJS functions directly into the containers and components, but it won't be a good practice since it would cause a lot of code duplication and not look good in our code. To avoid this, we will use a utility file, import all ConseilJS functions into one place and then access them from anywhere in our project. We have already provided an empty file in the repo which can be found under `utils/conseilUtils.js`

## Step 1.1 - Prepare conseilUtils.js

Open the `src/utils/conseilUtils.js` file using your favorite code editor and paste below lines:

```
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
```
Here is what this code piece will do for us.

It will first start by importing the [TezosWalletUtil](https://cryptonomic.github.io/ConseilJS/modules/tezoswalletutil.html) module into our project from ConseilJS. Then it will get the [unlockFundraiserIdentity](https://cryptonomic.github.io/ConseilJS/modules/tezoswalletutil.html#unlockfundraiseridentity) function from this . Finally, it will create an abstraction around this function so that it will be much easier for us to call this function from anywhere in our project. Let's take a closer look at this function.

The `unlockFundraiser` function we are exporting to the rest of our project will make an asynchronous call to `unlockFundraiserIdentity` function with 4 parameters;

`mnemonic`: Users 15 word mnemonic, which should be entered as a single line of string with exactly one space in between.

*e.g: distance exact welcome relief home strike much magic aspect reopen soft impose credit mean gap*

`email`: E-mail address of the fundraiser account

`password`: Password of the fundraiser account

`pkh`: Public Key Hash of the fundraiser account

To have a better understanding of how these fields look like, go ahead and get your Alphanet fundraiser account from the [Faucet](https://faucet.tzalpha.net). This faucet will give you a .JSON file with 6 fields. We have already discussed the 4 fields above. The remaining two are;

`secret`: The activation code for the fundraiser account, which we will use during the activation step.

`amount`: Balance of the fundraiser account, represented in uTez (10e6).

**Back to our function.**

`unlockFundraiser` will make an async call with the 4 parameters discussed above, and wait for ConseilJS to return the `KeyStore` for this account.

A `Keystore` is an object with 5 fields;

`publicKey`: Public Key of the account

`privateKey`: Private Key of the account

`publicKeyHash`: Hash of the public key, also known as address

`seed`: 15 word mnemonic of the address

`storeType`: Type of the wallet, it will be *1* in our case.

Alright, we are done preparing our `unlockFundraiser` function. Let us now bind it to the `Unlock` button in our `FundraiserForm`.

## Step 1.2: Bind Unlock button to UnlockFundraiser function

In this step, we will be working with the `FundraiserForm` container located at `src/containers/FundraiserForm/index.js`. This is the container where React renders all the fields for our user to paste their fundraiser information. Open up this file in your code editor and follow below instructions:

### Step 1.2.1: Get the unlockFundraiser function from conseilUtils

First thing we need to do is to get the `unlockFundraiser` function we created in Step 1.1 here. To do so, paste below code to the line 12 of this file.

```
import { unlockFundraiser } from '../../utils/conseilUtils'
```

### Step 1.2.2: Bind the function to Unlock button

Unlock button in this container triggers the `handleSubmit` function. So in this step we will be editing this function. Scroll down to line 45.

You don't need to edit the first 4 lines of this function. In these first 4 lines, React will get the mnemonic, password, pkh, email, and secret user entered to the FundraiserForm.

Since we have all parameters we need, we can now call our function. We know that unlockFundraiser will return a Keystore object with 5 fields. So, let's store all those fields to a variable called `keyStore`.

Replace the code in line 52 of this file with this:

```
const keyStore = await unlockFundraiser(mnemonic, email, password, pkh);
```

The good thing about ConseilJS is that, it will check all the fields user entered, and return an error if something's wrong with it. In the `if` clause provided at line 54, we check if the `unlockFundraiser` function returned an error or not.

**If there is an error with the information user entered,** we display the message on the screen.

**If there are no errors in it,** we unlock our wallet and then pass the details about users identity to the rest of our application.

## Try it yourself

Start your application by running `npm start` command, enter the fundraiser details you got from the faucet to your wallet and hit unlock. ConseilJS will process all the details you entered and display all the details about your KeyStore on the screen. This is a good time to remind you that this wallet is created for tutorial purposes only, and should not be used with real fundraiser information. It is a terrible idea to display the secretKey of an account anywhere in the application.

Refresh the page and re-enter the details to your account. But this time, make a mistake on purpose (i.e; change a letter in the email) and try unlocking again. You will see that ConseilJS will return an error instead of a KeyStore.

## Congratulations

You have used your first ConseilJS function. Feel free to discover the rest of the code and play around with it. When ready, stop your application by hitting `CTRL + C` and commit all the changes you did so far so you can switch to one of the following branches we listed below;

**First commit all the changes you made on this branch**
```
git commit -a -m "completed the first step of web-wallet tutorial"
```

**Switch to the branch you desire**

If you couldn't manage to get your app running, checkout below branch to understand what went wrong.
```
git checkout web-wallet/step-1-complete
```
Open up this branch in your [browser](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-1-complete).


If you successfully completed this step, checkout below branch to implement functions which actually query a Conseil and Tezos server.
```
git checkout web-wallet/step-2
```
Open up this branch in your [browser](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-2).
