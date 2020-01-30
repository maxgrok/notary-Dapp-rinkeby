import React from "react";
import { Input, Card, Flex, Box, Text, Button, Link, EthAddress } from "rimble-ui";
import ipfs from '../ipfs';
// Address of the deployed smart contract (from etherscan)
const contractAddress = "0x9414edDe4295484ceb3836B8fce48f796FCDB9c4";

// Copied from remix ide
const contractAbi =[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "proofs",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "document",
          "type": "string"
        }
      ],
      "name": "notarize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "document",
          "type": "string"
        }
      ],
      "name": "proofFor",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "document",
          "type": "string"
        }
      ],
      "name": "checkDocument",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

class SmartContractControls extends React.Component {
  state = {
    value: "Upload a Document Here",
    needsUpdate: false,
    ipfsHash: null
  }
  
  //captures the file uploaded
  captureFile = (event)=>{
    event.preventDefault();
    let needsUpdate = true;
    const file = event.target.files[0];
    try {

    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend =() => this.convertToBuffer(reader);
    }catch {
      console.log("error")
    }
  }

  //converts file to buffer
  convertToBuffer = async(reader) =>{
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer })
  }

  //uploads document file to IPFS and sets the IPFS Hash in response to ipfsHash
  onIPFSSubmit = async() =>{
     await ipfs.add(this.state.buffer, (err, ipfsHash)=>{
      console.log(err, ipfsHash);
      this.setState({ipfsHash:ipfsHash[0].hash});
      this.notarize(ipfsHash[0].hash);
    });
  }

  // Check for updates to the transactions collection
  processTransactionUpdates = prevProps => {
    Object.keys(this.props.transactions).map(key => {
      let tx = this.props.transactions[key];
      console.log("Needs updated number: ", tx.status, this.state.needsUpdate);
      // Will not work if there is a tx started before a prior tx has success -- first will flip needsUpdate to false
      if (tx.status === "success" && this.state.needsUpdate) {
        console.log("Getting updated number.");
        this.getNumber();
        return false;
      } else {
        console.log("Not updating number.");
        return false;
      }
    });
  };
  
  // Notarizes document! 
  notarize = (ipfsHash, {...props}) => {
    function callback(res, err){
      console.log("notarize function callback: " + res)
    }
    this.props.contractMethodSendWrapper("notarize", ipfsHash, callback);
  };

  componentDidMount() {
    // Init the contract after the web3 provider has been determined
    this.props.initContract(contractAddress, contractAbi).then(() => {
      // Can finally interact with contract
      //let document = "document" // grab file name from document
      //this.getNumber(this.props.document);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //this.processTransactionUpdates(prevProps);
  }

  render() {
    return (
      <Box>

        <Flex px={0} justifyContent="space-between" alignItems={'center'}>
         <Text fontWeight={3} mb={3} textAlign={'center'} my={2}>
            Upload a document below: 
          </Text>

          {/* <Button.Outline
            size={"small"}
            onClick={this.resetCounter}
            disabled={!this.props.account}
          >
            Reset
          </Button.Outline> */}
        </Flex>

        <Flex flexDirection={'row'} className="docNode">
          {/* <Button
            onClick={this.decrementCounter}
            flex={'1'}
            mr={[2, 3]}
          >
            Decrease value
          </Button> */}
          <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <Text><strong>Step 2:</strong> Upload a File from your Computer!
<br/><br/>
                  You will see the button "Choose File..." update with your file's name upon selecting a file from your computer!
<br/><br/>
                  The application will not notarize or upload without this! <br/><br/>
                  </Text>
          <Input type="file" backgroundColor="blue" className="doc" onChange={this.captureFile} />
            </Card>
        </Flex>
        <br/>
        <br/>
            <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <Text><strong>Step 3:</strong> Click "Upload to IPFS and Notarize" to upload your document to IPFS and notarize it. 
                <br/><br/>
                  You will see an update with your IPFS Hash and a link to the IPFS Browser to see your file! 

                  <br/><br/>You will also be prompted by MetaMask to notarize the IPFS Hash of the document you uploaded. <br/><br/><strong>Please click "Confirm" in the MetaMask pop up after clicking this button</strong>
                  </Text>
        <Flex flexDirection={'row'} px={0} justifyContent="space-between" alignItems={'center'}>
          <Button mainColor="green"
            icon="PinDrop"
            flex={'1'}
            onClick={async(e)=> {
              e.preventDefault();
              this.onIPFSSubmit();
            }}
          >
            Upload to IPFS and Notarize
          </Button>
          </Flex>

        <br/>
        <br/>
        <Flex>
       {this.state.ipfsHash ? <Text><strong>IPFS Hash for your file: <br/><EthAddress address={this.state.ipfsHash}/></strong> <br/><strong>To see the file on IPFS, go to the</strong> <Link href={'//ipfsbrowser.com/'} target="_blank" title="This link goes somewhere">
  IPFS Hash Browser
</Link> <strong>and enter in this hash.</strong> </Text>: ""}
        </Flex>
</Card>
      </Box>

    );
  }
}

export default SmartContractControls;
