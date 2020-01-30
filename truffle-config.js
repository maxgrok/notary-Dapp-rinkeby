const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim(); //mnemonic stored in .secret

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "118951e57cf64dc5a614119f6a85ae10"; //infura Project Key/API Key 

const infuraRinkebyURL = `https://rinkeby.infura.io/v3/${infuraKey}`;
const infuraMainnetURL = `https://mainnet.infura.io/v3/${infuraKey}`;

const provider = new HDWalletProvider(mnemonic,infuraRinkebyURL);

const mainNet = new HDWalletProvider(mnemonic,infuraMainnetURL)

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    
    rinkeby:{
      provider: () => provider, 
      network_id: 4, //rinkeby network_id 
      gas: 5500000
    },

    mainnet:{
      provider: () => mainNet,
      network_id: 1,  // mainnet network_id
      gas: 5500000
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
    }
  }
}
