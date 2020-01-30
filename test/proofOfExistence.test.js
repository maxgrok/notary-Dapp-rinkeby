const ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

contract("ProofOfExistence", accounts => {
  it("...should notarize 'magic'.", async () => {
    const proofOfExistenceInstance = await ProofOfExistence.deployed();

    // Set value of "magic"
    await proofOfExistenceInstance.notarize("magic", { from: accounts[0] });

    // Get stored value
    const magic = await proofOfExistenceInstance.checkDocument("magic");

    assert.equal(magic, true, "The keccak256 hash of the document 'magic' was not stored.");
  });

  it("...should be able to store and have proofs for multiple documents", async() => {
    const proofOfExistenceInstance = await ProofOfExistence.deployed();
    
    await proofOfExistenceInstance.notarize("magic", { from: accounts[0] });

    await proofOfExistenceInstance.notarize("numero duo", { from: accounts[0]});

    const magic = await proofOfExistenceInstance.checkDocument("magic");

    const nduo = await proofOfExistenceInstance.checkDocument("numero duo");

    assert.equal(magic, true, "The keccak256 hash of the document 'magic'.");
    assert.equal(nduo, true, "document 'numero duo' were not stored.");
  });
  
  it("calculates the keccak256 proof accurately for the document", async() =>{
    const proofOfExistenceInstance = await ProofOfExistence.deployed();
    
    keccak256 = require('js-sha3').keccak256;
    const document = "magic";
    const keccak = await proofOfExistenceInstance.proofFor(document);

    assert.equal(keccak, "0x" + keccak256(document) , "does not provide proof for document");
  });
  // write three more tests
  it("", async()=>{
      // is Ownable, checks file imports from librar 
  });

  it("", async()=>{

  });

  it("", async()=>{

  });
});