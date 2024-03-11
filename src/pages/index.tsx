import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Box } from "@chakra-ui/react";
import TempHero from "../components/hero";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" minWidth="min-content">
      <Provider store={store}>
        <TempHero />
      </Provider>
    </Box>
  );
};

export default IndexPage;
