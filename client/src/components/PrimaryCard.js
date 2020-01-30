import React from "react";
import { Card } from "rimble-ui";

import RimbleWeb3 from "../utilities/RimbleWeb3";
import TransactionToastUtil from "../utilities/TransactionToastUtil";
import SmartContractControls from "./SmartContractControls";
import TransactionsCard from "./TransactionsCard";
import { Text } from "rimble-ui";

class PrimaryCard extends React.Component {
  render() {
    return (
      <RimbleWeb3.Consumer>
        {({
          contract,
          account,
          transactions,
          initContract,
          initAccount,
          contractMethodSendWrapper
        }) => (
          <div>
            <Card maxWidth={'640px'} px={4} mx={'auto'}>
              <SmartContractControls
                contract={contract}
                account={account}
                transactions={transactions}
                initContract={initContract}
                contractMethodSendWrapper={contractMethodSendWrapper}
              />
            </Card>
     <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <Text><strong>Congratulations!</strong><br/> You successfully uploaded a file to IPFS from your Computer AND notarized it on the Rinkeby Testnet!<br/><br/>

                  You will see the Transaction process updates and see various messages about status of the notarization of your document. This may take several minutes.
<br/><br/>
                  Afterwards, see your transaction hash by clicking on "TXHash" in the Transactions Table below. Hint: You may need to scroll to the right. 
                  <br/> 
                  </Text>
            </Card>
            <TransactionsCard transactions={transactions} />
            <TransactionToastUtil transactions={transactions} />

          </div>
        )}
      </RimbleWeb3.Consumer>
    );
  }
}

export default PrimaryCard;
