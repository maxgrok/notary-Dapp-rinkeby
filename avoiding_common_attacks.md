Explain what measures you’ve taken to ensure that your contracts are not susceptible to common attacks

(1) Scanned with MythX in Remix for the smart contract "ProofOfExistence.sol" - came up clean for any attacks. This checks for re-entrancy attacks, etc. 

(2) There is no use of loops. Loops can make the contract vulnerable to attack. 