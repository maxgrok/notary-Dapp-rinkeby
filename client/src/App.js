import React, { Component } from "react";
// import ipfs from './ipfs';
import { Flex, Link, Card, Heading, Text, ThemeProvider, Box} from 'rimble-ui';
import RimbleWeb3 from './utilities/RimbleWeb3';
import Header from './components/Header';
import WalletBlock from './components/WalletBlock';
import ConnectionBanner from "@rimble/connection-banner";
import NetworkIndicator from "@rimble/network-indicator";
import InstructionsCard from './components/InstructionsCard';
import PrimaryCard from "./components/PrimaryCard";

class App extends Component {

  state = {
    route: "default"
  };

  // Optional parameters to pass into RimbleWeb3
  config = {
    accountBalanceMinimum: 0.001,
    requiredNetwork: 4
  };

  showRoute = route => {
    this.setState({
      route
    });
  };

  render() {
    return (
      <ThemeProvider>
        <RimbleWeb3 config={this.config}>
          <RimbleWeb3.Consumer>
            {({
              needsPreflight,
              validBrowser,
              userAgent,
              web3,
              account,
              accountBalance,
              accountBalanceLow,
              initAccount,
              rejectAccountConnect,
              userRejectedConnect,
              accountValidated,
              accountValidationPending,
              rejectValidation,
              userRejectedValidation,
              validateAccount,
              connectAndValidateAccount,
              modals,
              network,
              transaction,
              web3Fallback
            }) => (
              <Box>
                <Header
                  account={account}
                  accountBalance={accountBalance}
                  accountBalanceLow={accountBalanceLow}
                  initAccount={initAccount}
                  rejectAccountConnect={rejectAccountConnect}
                  userRejectedConnect={userRejectedConnect}
                  accountValidated={accountValidated}
                  accountValidationPending={accountValidationPending}
                  rejectValidation={rejectValidation}
                  userRejectedValidation={userRejectedValidation}
                  // validateAccount={validateAccount}
                  // connectAndValidateAccount={connectAndValidateAccount}
                  modals={modals}
                  network={network}
                />

                <Box maxWidth={'640px'} mx={'auto'} p={3} >
                  <ConnectionBanner
                    currentNetwork={network.current.id}
                    // requiredNetwork={this.config.requiredNetwork}
                    onWeb3Fallback={web3Fallback}
                  />
                </Box>
                <Card maxWidth={'640px'} mx={'auto'} p={3} >
                  <Heading.h2 mr={3}>
                    <span role="img" aria-label="Waving hand">
                      👋
                    </span>
                  </Heading.h2>
                  <Text>
                    Hi there, I'm Max. This is my Proof of Existence Dapplication for the Consensys Academy Blockchain Bootcamp! Built with generous help from the <Link href="https://github.com/ConsenSys/rimble-app-demo" target="_blank">Consensys Rimble-App-Demo</Link>
                    <br/><br/>
                    I'll walk you through how to operate it!<br/><br/>
                    <strong>But first make sure you have your MetaMask set to Rinkeby Network and that you also have some Test Eth in your account. To get some, click the "Get Rinkeby ETH" link below. 
                    </strong>
                    <br/><br/>By the end, you will have uploaded a document to IPFS and notarized it on the Rinkeby Network. 
                  </Text>
                </Card>
                <Card maxWidth={'640px'} mx={'auto'} p={3} px={4}>
                  <NetworkIndicator
                    currentNetwork={network.current.id}
                    requiredNetwork={network.required.id}
                  />
                  <InstructionsCard
                  showRoute={this.showRoute}
                  route={this.state.route}
                />
                </Card>
                
                <WalletBlock
                  account={account}
                  accountBalance={accountBalance}
                  accountBalanceLow={accountBalanceLow}
                  accountValidated={accountValidated}
                  connectAndValidateAccount={connectAndValidateAccount}
                />

                {this.state.route === "default" ? <PrimaryCard /> : null}
              </Box>
            )}
          </RimbleWeb3.Consumer>
        </RimbleWeb3>
      </ThemeProvider>
    );
  }
}

export default App;