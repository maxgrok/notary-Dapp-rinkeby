## Design Patterns Decisions

### Saves on Gas: 
#storeProof && #hasProof functions are internal meaning only this contract and contracts deriving from it can use these methods. 

### Mortal Design Pattern with #kill function:

#kill function only executable by the owner of this contract or derived contracts with the internal keyword. This function destroys the contract. 
