# README
Deployed: http://bit.ly/36DWMbW

Rinkeby contract deployed: https://rinkeby.etherscan.io/address/0x9414edDe4295484ceb3836B8fce48f796FCDB9c4/  
## What does this project do? 

This is a final project for Consensys Academy Blockchain Developer Bootcamp. It allows users to upload a file to IPFS and notarize it with their MetaMask Rinkeby Ethereum Account and post it on Rinkeby Testnet with the simple click of a single deploy button. Complete with toast messages for user status updates. 

## How to I Set It Up Locally? 

### 1st
Update .secret file with your Mnemonic for your MetaMask account. Set MetaMask to custom network `localhost` on port `8545`.

### 2nd
Start ganache with your test mnemonic from MetaMask. `ganache-cli -m 'yourMnemonicHere' `

### 3rd
Run `truffle compile` and `truffle migrate --network develop` to compile and deploy your proof of existence contract from the root directory of the project.

### 4th
Start the app from `client/` directory with `npm start`
 
 ### Credits

 Made with <3 from <a href="https://github.com/ConsenSys/rimble-app-demo">Rimble App Demo</a>.







