import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Box } from "@chakra-ui/react";


const IndexPage = (): JSX.Element => {

  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" minWidth="min-content">
      <Provider store={store}>

      </Provider>
    </Box>
  );
};

export default IndexPage;
