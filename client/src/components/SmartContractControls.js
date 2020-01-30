import React from "react";
import { Input, Flex, Box, Text, Button, Link, EthAddress } from "rimble-ui";
import ipfs from '../ipfs';
// Address of the deployed smart contract (from etherscan)
const contractAddress = "0xF0293e1688c8BAA9bC1eC7c28A64baF6C360B132";

// Copied from remix ide
const contractAbi =[
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
  },
]

class SmartContractControls extends React.Component {
  state = {
    value: "Upload a Document Here",
    needsUpdate: false,
    fileName: null
  }
  
  //captures the file uploaded
  captureFile = (event)=>{
    event.preventDefault();
    let needsUpdate = true;
    const file = event.target.files[0];
    let fileName = event.target.files[0].name
    console.log(fileName)
    this.setState({fileName});
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend =() => this.convertToBuffer(reader);
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
    })
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
  notarize = ({...props}) => {
    function callback(res, err){
      console.log("notarize function callback: " + res)
          console.log("Completed notarization");
    }
    let value = this.state.fileName;
    this.props.contractMethodSendWrapper("notarize", value, callback);
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

       <Flex>
      </Flex>

        <Flex flexDirection={'row'} className="docNode">
          {/* <Button
            onClick={this.decrementCounter}
            flex={'1'}
            mr={[2, 3]}
          >
            Decrease value
          </Button> */}
          <Input type="file" name="file" className="doc" onChange={this.captureFile} /><br/><br/>
          <br/>
          <Button as="submit"
            flex={'1'}
            onClick={(e)=> {
              e.preventDefault();
              this.notarize(e);
              this.onIPFSSubmit();
            }}
          >
            Notarize and Upload to IPFS
          </Button>
        </Flex>
        <br/>
        <br/>
        <Flex>
       {this.state.ipfsHash ? <Text><strong>IPFS Hash for {this.state.fileName}<br/><EthAddress address={this.state.ipfsHash}/></strong> <br/><strong>To see the file on IPFS, go to the</strong> <Link href={'//ipfsbrowser.com/'} target="_blank" title="This link goes somewhere">
  IPFS Hash Browser
</Link> <strong>and enter in this hash.</strong> </Text>: ""}
        </Flex>

      </Box>

    );
  }
}

export default SmartContractControls;
