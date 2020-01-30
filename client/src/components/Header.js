import React from "react";
import { Box, Heading } from "rimble-ui";

class Header extends React.Component {
  render() {
    return (
      <Box bg="blue" p={3} justifyContent="center" flexDirection="column">
        <Box maxWidth="400px" mx="auto">
          <Heading fontSize={4} color={"white"}>Proof of Existence Dapp</Heading>
        </Box>
      </Box>
    );
  }
}

export default Header;
