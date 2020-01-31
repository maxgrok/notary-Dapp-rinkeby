# README

This is a final project for Consensys Academy Blockchain Developer Bootcamp 2019-2020.

App Demo: http://bit.ly/36DWMbW <br/><em>Requires: MetaMask & Internet Connection & Rinkeby ETH</em>

Rinkeby contract deployed: https://rinkeby.etherscan.io/address/0x5b0c51dDA0263bBffEb3093D7F664305FB075e08/  

<a href="https://youtu.be/fNtoz6l-YF8">!['notary-dapp-rinkeby'](https://media.giphy.com/media/f6JmPFaArTS71zduv5/giphy.gif)</a>

## What does this project do? 

It allows users to upload a file to IPFS and notarize it with their MetaMask Rinkeby Ethereum Account and post it on Rinkeby Testnet with the simple click of a single deploy button. Complete with toast messages for user status updates. 

## How do I set it up locally? 

### Pre-Requisites

<em>Required:</em> MetaMask, Node.js, Npm/yarn, Internet Connection (for Contract Deployment and IPFS Upload)<br/>
<em>Optional:</em> Truffle (only for debugging and deploying smart contracts included)

### 1st
Update .secret file with your Mnemonic for your MetaMask account and set your MetaMask extension to custom network `rinkeby network`. <em>Make sure you have test ETH in your Rinkeby Account</em>. If not, get some from a Rinkeby faucet. 

### 2nd
Start the app from `client/` directory with `npm start`

### 3rd
Navigate to `localhost:3000` and upload and notarize documents with one click of a button!
 
#### Credits
Made with <3 from <a href="https://github.com/ConsenSys/rimble-app-demo">Rimble App Demo</a>.

#### License 
MIT License, Max Goodman, January 2020. 


