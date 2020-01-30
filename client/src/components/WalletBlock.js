import React, { Component } from 'react';
import { Card, Text, Button } from 'rimble-ui';

import AccountOverview from "../utilities/components/AccountOverview";


class WalletBlock extends Component {

  handleConnectAccount = () => {
    this.props.connectAndValidateAccount(result => {
      if (result === "success") {
        // success
        console.log("Callback SUCCESS");
      } else if (result === "error") {
        // error
        console.log("Callback ERROR");
      }
    })
  }

  renderContent = () => {
    if (this.props.account) {
      return (
        <AccountOverview
          account={this.props.account}
          accountBalanceLow={this.props.accountBalanceLow}
          accountBalance={this.props.accountBalance}
        />
      )
    } else {
      return (
        <div>
        <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <Text><strong>Step 1:</strong> Connect your Wallet by clicking on the "Connect Your Wallet" button below. 

                  You will see the site update to reflect your wallet address and balance on the Rinkeby Network. 
                  </Text>
                  </Card>
        <Button mainColor="green" onClick={this.handleConnectAccount} width={1}>
          Connect your wallet
        </Button>
        </div>
      )
    }
  }

  render() {
    return (
      <Card maxWidth={'640px'} mx={'auto'} p={4} >
        <Text fontWeight={3} mb={3}>
          Wallet:
        </Text>
        {this.renderContent()}
      </Card>
    );
  }

}

export default WalletBlock;
