# README
Deployed: http://bit.ly/36DWMbW

Rinkeby contract deployed: https://rinkeby.etherscan.io/address/0x9414edDe4295484ceb3836B8fce48f796FCDB9c4/  
### 1st

Update .secret file with your Mnemonic for your MetaMask account. Set MetaMask to custom network "localhost" on port "8545".

### 2nd
Start ganache with your test mnemonic from MetaMask. `ganache-cli -m 'yourMnemonicHere' `

### 3rd
Run `truffle compile` and `truffle migrate --network develop` to compile and deploy your proof of existence contract from the root directory of the project.

### 4th
Start the app from client/ directory with `npm start`
 






