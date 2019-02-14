# ConseilJS Tutorials: Building a simple web wallet for the Tezos Alphanet

Welcome!

In this tutorial we will be building a very simple web wallet for the Tezos Alphanet using React and ConseilJS.

**IMPORTANT NOTE: DO NOT USE THIS WALLET WITH TEZOS MAINNET!**

Do not use the wallet you create at the end of this tutorial on Mainnet. The main and only purpose of this tutorial is to show you how to integrate ConseilJS into a React project, and not to build a wallet suitable for the Tezos Mainnet. We will be using Tezos Alphanet throughout this tutorial.

## ConseilJS API Documentation

API Documentation for the ConseilJS Library can be found here: https://cryptonomic.github.io/ConseilJS/

## How to navigate around the tutorial

Every step in this tutorial has its own dedicated branch. You can jump between these branches by running the following command:

```bash
git checkout [BRANCH_NAME]
```
See below for the branch structure for this tutorial.

```
|
|- web-wallet/start (YOU ARE HERE)
|- web-wallet/step-1
|- web-wallet/step-1-complete
|- web-wallet/step-2
|- web-wallet/step-2-complete
|- web-wallet/step-3
|- web-wallet/step-3-complete
```

If you ever get stuck during any of the steps, you can consult the `-complete` version of it for solutions.

## Preparing the environment

We are about to start with step-1. Let's go ahead and prepare the environment for your project to run.

To import ConseilJS to your project, you will need to add ConseilJS as a dependency in your `package.json` file. This file has already been provided within this tutorial. Go ahead and open the `package.json` using your favorite code editor and double check that `"conseiljs": "^0.2.0"` is listed under dependencies. See it there? Awesome! Let's go ahead and install all the dependencies you will need by running this command:

```bash
npm install
```
This will take sometime as npm will install all the dependencies you will be using during the project. As soon as the install is complete, go ahead and run below command and see if everything is installed fine and your project is running:

```bash
npm start
```

It is expected to get some compilation warnings after running this command, which will be resolved after you complete the next step of this tutorial. Just make sure that you see the user interface for our simple wallet when you open [localhost:3000](http://localhost:3000/) in a browser.

# Congratulations!

You have initialized your project successfully. Hit `Ctrl + C` to stop the development server and switch to `web-wallet/step-1` branch by running the following command.

```bash
git checkout web-wallet/step-1
```

Also open up its README in your browser to follow it easier: [web-wallet/step-1](https://github.com/Cryptonomic/ConseilJS-Tutorials/tree/web-wallet/step-1)

See you there!
